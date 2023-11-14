import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import 'tippy.js/dist/tippy.css';
import { get, remove } from '../AxiosClient';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

const statusFilterTemplate = (options) => {
    const filterValue = options.value;
    const setStatus = options.filterCallback;

    const onChangeStatus = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <div className="flex align-items-center gap-2">
            <label htmlFor="verified-filter" className="font-bold">
                Status
            </label>
            <TriStateCheckbox
                inputId="verified-filter"
                value={filterValue}
                onChange={(e) => onChangeStatus(e.value)}
            />
        </div>
    );
};

const Foods = () => {
    const navigate = useNavigate(null)

    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'Foods Management',
        subtitle: 'Table of Foods',
        apiPath: '/foods'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath);
        console.log(response);
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(news => {
                    return {
                        ...news,
                        createdDate: new Date(news.createdDate)
                    };
                });
            }
            return data;
        });
    });

    const createdDate = (rowData) => {
        return <>{(new Date(rowData.createdDate).toLocaleString())}</>;
    };

    const status = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined tooltip="Update" tooltipOptions={{ position: 'bottom' }} onClick={() => navigate(`/dashboard/foods/update/${(item.id)}`)} />
            <Link><Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} tooltip="Delete" tooltipOptions={{ position: 'bottom' }} /></Link>
        </div>
    }
    const creatorFullName = (rowData) => {
        return `${rowData.creator.lastname} ${rowData.creator.firstname}`;
    }

    const handleDeleteClick = (rowData) => {
        setDeleteId(rowData.id)
        openDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        remove(`${labels.apiPath}/${deleteId}`).then((response) => {
            if (response.status === 200) {
                mutate({ ...data })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Delete successfully', life: 3000 })
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
            }
            openDeleteModal(false)
        })
    }

    const deleteModalFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => openDeleteModal(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleConfirmDelete} />
        </React.Fragment>
    );

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };



    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id", filter: true },
        { field: 'name', header: 'Name', sortable: true, filterField: "name", filter: true },
        { field: 'type', header: 'Type', sortable: true, filterField: "Type", filter: false },
        { field: 'creator', header: 'Creator', body: creatorFullName, sortable: true, filterField: "creator", filter: true },
        { field: 'quantity', header: 'Quantity', sortable: true, filterField: "quantity", filter: true },
        { header: 'Created Date', body: createdDate, sortable: true, filterField: "createdDate", filterElement: dateFilterTemplate, dataType: 'date', filter: true },
        { field: 'status', header: 'Status', dataType: "boolean", body: status, sortable: true, filterField: false, filter: true, filterElement: statusFilterTemplate },
        { header: 'Actions', body: actionBody, filterField: false },
    ];

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        creator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        quantity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        createdDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        type: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Link to="/dashboard/foods/create"><Button label='Create' severity='success' /></Link>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    return (
        <div className='p-5'>
            {isLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            <Toast ref={toast} />
            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                onHide={() => openDeleteModal(false)}
                footer={deleteModalFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        Are you sure you want to delete this?
                    </span>
                </div>
            </Dialog>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable value={data.data} loading={isLoading} showGridlines scrollHeight="77vh" scrollable style={{ width: "77vw" }}
                        filters={filters}
                        header={header}
                        paginator rows={10}
                        globalFilterFields={['id', 'type', 'status', 'createdDate', 'creator', 'quantity']}
                        emptyMessage="No news found."
                    >
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                sortable={col.sortable}
                                style={(col.header === 'Content' && { minWidth: '20rem' }) ||
                                    (col.header === 'Actions' && { minWidth: '8.75rem' })
                                }
                                filter={col.filter}
                                filterField={col.filterField}
                                filterPlaceholder={`Search by ${col.header.toLowerCase()}`}
                                filterElement={col.filterElement}
                                dataType={col.dataType}
                            />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Foods
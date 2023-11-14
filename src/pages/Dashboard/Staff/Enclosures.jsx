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
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { decode } from '~/utils/axiosClient';
import { get, remove } from '../AxiosClient';

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

const Enclosures = () => {
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'Enclosure Management',
        subtitle: 'Table of Enclosures',
        apiPath: '/enclosures'
    }

    const idBody = (item) => {
        return <div className='flex justify-center items-center font-bold'>{item.id}</div>
    }

    const idHabitatName = (item) => {
        return <div className='w-60'>{item.habitat.name}</div>
    }

    const infoBody = (item) => {
        return <div className='w-60'>{item.info}</div>
    }

    const imgBody = (item) => {
        return (
            <div className='w-32 h-16 shadow-2 rounded-md '>
                <img className="w-32 h-16 rounded-md object-cover" src={item.imgUrl} alt={item.name} />
            </div>
        )
    }

    const statusBody = (item) => {
        return (
            <div class="flex justify-center items-center">
                <Tag value={item.status ?
                    'True' :
                    'False'}
                    className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
            </div>
        )
    }
    const createdDate = (item) => {
        return <div className='w-52'>{new Date(item.createdDate).toLocaleString()}</div>
    }


    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            {userRole === 'STAFF' && (
                <React.Fragment>
                    <Link to="/dashboard/enclosures/update" state={item}><Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined tooltip="Update" tooltipOptions={{ position: 'bottom' }} /></Link>
                    <Link><Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} tooltip="Delete" tooltipOptions={{ position: 'bottom' }} /></Link>
                </React.Fragment>
            )}
            <Link to="/dashboard/animals/feeding" state={item}><Button icon="pi pi-calendar-plus" severity="secondary" aria-label="Bookmark" rounded outlined tooltip="Create Feeding Schedule" tooltipOptions={{ position: 'left' }} /></Link>
        </div>
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const columns = [
        { field: 'id', header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { field: 'name', header: 'Name', sortable: true, filterField: "name" },
        { field: 'habitat.name', header: 'Habitat Name', body: idHabitatName, sortable: true, filterField: "habitat.name" },
        { field: 'info', header: 'Infomation', body: infoBody, sortable: true, filterField: "info" },
        { field: 'maxCapacity', header: 'Max Capacity', sortable: true, filterField: "maxCapacity" },
        { field: "createdDate", header: 'Created Date', dataType: "date", body: createdDate, sortable: false, filterField: false, filterElement: dateFilterTemplate },
        { header: 'Image', body: imgBody, sortable: false, showFilterMenu: false },
        { field: "status", header: 'Status', dataType: "boolean", body: statusBody, sortable: false, filterField: false, filterElement: statusFilterTemplate },
        { header: 'Action', body: actionBody, sortable: false, showFilterMenu: false }
    ]

    const { data, mutate, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath); // Assuming get is an asynchronous function fetching the data
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(user => {
                    return {
                        ...user,
                        createdDate: new Date(user.createdDate) // Convert dateOfBirth to a Date object
                    };
                });
            }
            return data;
        });
    });


    console.log(data);

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

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'habitat.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        info: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        maxCapacity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
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
                {userRole === 'STAFF' && (
                    <Link to="/dashboard/enclosures/create"><Button label='Create' severity='success' /></Link>
                )}
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
                        Are you sure you want to delete this Enclosure?
                    </span>
                </div>
            </Dialog>

            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable
                        size='small'
                        value={data.data}
                        loading={isLoading}
                        showGridlines
                        scrollHeight="77vh"
                        scrollable
                        style={{ width: "77vw" }}
                        filters={filters}
                        paginator rows={10}
                        globalFilterFields={['id', 'name', 'habitat.name', 'info', 'maxCapacity', 'createdDate', 'status']}
                        header={header}
                        emptyMessage="No Enclosure found."
                    >

                        {columns.map((col) => (
                            <Column
                                key={col.field}
                                dataType={col.dataType}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                                sortable={col.sortable}
                                className='min-w-max'
                                filter
                                filterField={col.filterField}
                                filterElement={col.filterElement}
                                showFilterMenu={col.showFilterMenu}
                            />

                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Enclosures
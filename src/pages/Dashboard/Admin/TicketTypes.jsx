import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get, remove } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { InputText } from 'primereact/inputtext';
import { useNavigate, Link } from 'react-router-dom';

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

const TicketTypes = () => {
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const navigate = useNavigate(null)
    const toast = useRef(null);

    const labels = {
        title: 'Ticket Type Management',
        subtitle: 'Table of Ticket Type',
        apiPath: '/tickets'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const idBody = (item) => {
        return <div className='flex justify-center items-center font-bold'>{item.id}</div>
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

    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined onClick={() => navigate('/dashboard/tickets/update', { state: item })} tooltip="Update" tooltipOptions={{ position: 'bottom' }} />
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} tooltip="Delete" tooltipOptions={{ position: 'bottom' }} />
        </div>
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

    const columns = [
        { field: 'id', header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { header: 'Image', body: imgBody, sortable: false, showFilterMenu: false },
        { field: 'name', header: 'Name', sortable: true, filterField: "name" },
        { field: 'price', header: 'Price', sortable: true, filterField: "price" },
        { field: 'type', header: 'Type', sortable: true, filterField: "type" },
        { field: 'description', header: 'Description', sortable: true, filterField: "type" },
        { field: "status", header: 'Status', dataType: "boolean", body: statusBody, sortable: false, filterField: false, filterElement: statusFilterTemplate },
        { header: 'Action', body: actionBody, sortable: false, showFilterMenu: false }
    ]

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
                <Link to="/dashboard/tickets/create"><Button label='Create' severity='success' /></Link>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    console.log(data);
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
                        Are you sure you want to delete this Ticket?
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
                        globalFilterFields={['id', 'name', 'price', 'type', 'description', 'status']}
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
                                style={(col.header === 'Description' && { minWidth: '20rem' }) || (col.header === 'Name' && { minWidth: '15rem' })} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default TicketTypes
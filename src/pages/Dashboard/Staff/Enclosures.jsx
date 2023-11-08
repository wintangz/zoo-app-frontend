import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get, remove } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';

const Enclosures = () => {
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'Enclosure Management',
        subtitle: 'Table of Enclosures',
        apiPath: '/enclosures'
    }

    const idBody = (item) => {
        return <div className='flex justify-center items-center'>{item.id}</div>
    }

    const imgBody = (item) => {
        return (
            <div className='w-32 h-16 shadow-2 rounded-md '>
                <img className="w-32 h-16 rounded-md object-cover" src={item.imgUrl} alt={item.name} />
            </div>
        )
    }

    const statusBody = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const createdDateBody = (item) => {
        return <span>{new Date(item.createdDate).toLocaleString()}</span>
    }

    const actionBody = (item) => {
        return <div className='flex flex-row gap-x-2'>
            <Link to="/dashboard/enclosures/update" state={item}> <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link>
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} />
        </div>
    }

    const columns = [
        { header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { field: 'name', header: 'Habitat Name', sortable: true, filterField: "name" },
        { field: 'info', header: 'Infomation', sortable: true, filterField: "info" },
        { field: 'maxCapacity', header: 'Max Capacity', sortable: true, filterField: "maxCapacity" },
        { header: 'Created Date', body: createdDateBody, sortable: false, filterField: false },
        { header: 'Image', body: imgBody, sortable: false, filterField: false },
        { header: 'Status', body: statusBody, sortable: false, filterField: false },
        { header: 'Action', body: actionBody, sortable: false, filterField: false }
    ]

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

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
        info: { value: null, matchMode: FilterMatchMode.IN },
        maxCapacity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
                <Link to="/dashboard/enclosures/create"><Button label='Create' severity='success' /></Link>
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
                        value={data.data}
                        loading={isLoading}
                        showGridlines scrollHeight="77vh"
                        scrollable
                        style={{ width: "77vw" }}
                        filters={filters}
                        paginator rows={10}
                        globalFilterFields={['id', 'name', 'info', 'maxCapacity']}
                        header={header}
                        emptyMessage="No Enclosure found."
                    >

                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                sortable={col.sortable} className='min-w-max' filterField={col.filterField} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Enclosures
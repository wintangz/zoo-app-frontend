import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get, remove } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Link, useNavigate } from 'react-router-dom';
const Animals = () => {

    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'Animal Management',
        subtitle: 'Table of Animals',
        apiPath: '/animals'
    }


    const avatarBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.imgUrl} alt={item.id} />
    }

    const sexBody = (item) => {
        return <Tag value={item.sex ?
            <div className='flex items-center'><BsGenderMale className='mr-1' />Male</div> :
            <div className='flex items-center'><BsGenderFemale className='mr-1' />Female</div>}
            className={`${item.sex ? 'bg-blue-400' : 'bg-pink-300'} p-2 text-[0.9rem]`} />
    }


    const statusBody = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const datetime = (item) => {
        return <span>{new Date(item.dateOfBirth).toLocaleString()}</span>
    }
    const Arrivaldatetime = (item) => {
        return <span>{new Date(item.arrivalDate).toLocaleString()}</span>
    }

    const handleDeleteClick = (rowData) => {
        setDeleteId(rowData.id)
        openDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        remove(`animals/${deleteId}`).then((response) => {
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
    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            <Link to="/dashboard/animals/update" state={item}><Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link>
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} />
            <Link to="/dashboard/animals/feeding" state={item}><Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" rounded outlined /></Link>
        </div>
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id" },
        { field: 'name', header: 'Name', sortable: true, filterField: "name" },
        { field: 'origin', header: 'Origin', sortable: true, filterField: "origin" },
        { header: 'Image', body: avatarBody, sortable: false, filterField: false },
        { header: 'Arrival Date', body: Arrivaldatetime, sortable: false, filterField: false },
        { header: 'Date Of Birth', body: datetime, sortable: false, filterField: false },
        { header: 'Sex', body: sexBody, sortable: false, filterField: false },
        { field: 'species', header: 'Species', sortable: true, filterField: "species" },
        { header: 'Status', body: statusBody, sortable: true, filterField: false },
        { header: 'Actions', body: actionBody, sortable: false, filterField: false },
    ]


    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        origin: { value: null, matchMode: FilterMatchMode.IN },
        speciesvc: { value: null, matchMode: FilterMatchMode.EQUALS },
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
                <Link to="/dashboard/animals/create"><Button label='Create' severity='success' /></Link>
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
                    <DataTable size='small' value={data.data} loading={isLoading} showGridlines scrollHeight="77vh" scrollable style={{ width: "77vw" }}
                        filters={filters}
                        paginator rows={10}
                        globalFilterFields={['id', 'name', 'origin', 'species']} header={header} emptyMessage="No customers found."
                    >
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                sortable={col.sortable} style={{ minWidth: '150px' }} filterField={col.filterField} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Animals
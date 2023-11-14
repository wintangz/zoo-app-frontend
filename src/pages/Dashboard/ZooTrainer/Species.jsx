import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
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

const Species = () => {

    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const navigate = useNavigate(null)
    const toast = useRef(null);

    const labels = {
        title: 'Species Management',
        subtitle: 'Table of Species',
        apiPath: '/species'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const imgBody = (item) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={item.imgUrl} alt={item.id} />
    }

    const avatarBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.avatarUrl} alt={item.id} />
    }

    const statusBody = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            <Link to={`/dashboard/species/update/${(item.id)}`} state={item}><Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined tooltip="Update" tooltipOptions={{ position: 'bottom' }} /></Link>
            <Link><Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} tooltip="Delete" tooltipOptions={{ position: 'bottom' }} /></Link>
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
        { field: 'id', header: 'ID', sortable: true, filterField: "id", filter: true },
        { field: 'name', header: 'Name', sortable: true, filterField: "name", filter: true },
        { field: 'species', header: 'Species', sortable: true, filterField: "species", filter: true },
        { header: 'Image', body: imgBody },
        { header: 'Avatar', body: avatarBody },
        { field: 'genus', header: 'Genus', sortable: true, filterField: "genus", filter: true },
        { field: 'family', header: 'Family', sortable: true, filterField: "family", filter: true },
        { field: 'habitat.name', header: 'Habitat', sortable: true, filterField: "habitat", filter: true },
        { field: 'diet', header: 'Diet', sortable: true, filterField: "diet", filter: true },
        { field: 'description', header: 'Description', sortable: true, filter: true },
        { field: 'status', header: 'Status', dataType: "boolean", body: statusBody, sortable: true, filterField: false, filter: true, filterElement: statusFilterTemplate },
        { header: 'Action', body: actionBody }
    ];
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        species: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        genus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        family: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        habitat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        diet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
                <Link to="/dashboard/species/create"><Button label='Create' severity='success' /></Link>
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
                        paginator rows={10}
                        globalFilterFields={['id', 'name', 'genus', 'diet', 'family', 'habitat', 'species', 'status']} header={header} emptyMessage="No customers found."
                    >
                        {columns.map((col) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                                filter={col.filter}
                                dataType={col.dataType}
                                filterPlaceholder={`Search by ${col.header.toLowerCase()}`}
                                sortable={col.sortable}
                                filterField={col.filterField}
                                filterElement={col.filterElement}
                                style={(col.header === 'Description' && { minWidth: '20rem' }) || (col.header === 'Image' && { minWidth: '10rem' }) || (col.header === 'Avatar' && { minWidth: '6rem' }) || (col.header === 'Action' && { minWidth: '8.75rem' })}
                            />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Species
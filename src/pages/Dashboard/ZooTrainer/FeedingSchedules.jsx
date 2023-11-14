import Tippy from '@tippyjs/react';
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
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { decode, get, remove } from '../AxiosClient';
const FeedingSchedules = () => {
    const location = useLocation();
    const [expandedRows, setExpandedRows] = useState(true);
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);
    const trainerId = parseInt(decode(localStorage.getItem('token')).sub);

    const labels = {
        title: 'Feeding Schedule Management',
        subtitle: 'Table of Feeding Schedules',
        apiPath: `/feeding_schedules/zoo-trainers/${trainerId}`,
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const avatarBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.animalId.imgUrl} alt={item.id} />
    }

    const sexBody = (item) => {
        return <Tag value={item.sex ?
            <div className='flex items-center'><BsGenderMale className='mr-1' />Male</div> :
            <div className='flex items-center'><BsGenderFemale className='mr-1' />Female</div>}
            className={`${item.sex ? 'bg-blue-400' : 'bg-pink-300'} p-2 text-[0.9rem]`} style={{ minWidth: "86px" }} />
    }
    const isFed = (item) => {
        return <Tag value={item.fed ?
            'Done' :
            'Not yet'}
            className={`${item.fed ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const feedingTimeBody = (item) => {
        return <span>{new Date(item.feedingTime).toLocaleString()}</span>
    }

    const actionBody = (item) => {
        return <div className='space-x-2 flex'>
            <Tippy content='Update' placement='bottom'><Link to='/dashboard/animals/feeding/update' state={item}><Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link></Tippy>
            <Tippy content='Delete' placement='bottom'><Link><Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} /></Link></Tippy>
            <Tippy content='Confirm' placement='bottom'><Link to="/dashboard/animals/feeding/confirm" state={item} ><Button icon='pi pi-check' className='border-green-500 text-green-500' rounded outlined /></Link></Tippy>
        </div>
    }

    const detailsName = (item) => {
        return `${item.food.name} - ${item.food.type}`;
    }

    const detailsExpected = (item) => {
        return item.expectedQuantity;
    }

    const detailsActual = (item) => {
        return item.actualQuantity;
    }

    const feederBody = (item) => {
        return <div>{item.feederId ? `${item.feederId?.lastname} ${item.feederId?.firstname} - ${item.feederId?.id}` : ''}</div>
    }

    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id" },
        { header: 'Feeding time', body: feedingTimeBody, sortable: true, filterField: "feedingTime" },
        { header: 'Is Fed', body: isFed, sortable: true, filterField: false },
        { header: 'Feeder', body: feederBody, sortable: true, filterField: true },
        { header: 'Avatar', body: avatarBody, sortable: false, filterField: false },
        { field: 'animalId.name', header: 'Animal name', sortable: true, filterField: "animalId.name" },
        { field: 'animalId.species.name', header: 'Species', sortable: true, filterField: "animalId.species.name" },
        { field: 'animalId.origin', header: 'Origin', sortable: true, filterField: 'animalId.origin' },
        { header: 'Sex', body: sexBody, sortable: true, filterField: false },
        { header: 'Actions', body: actionBody, sortable: false, filterField: false },
    ]

    // handle dropdown events


    const allowExpansion = (rowData) => {
        console.log(rowData)
        return rowData.details.length > 0;
    };

    const expandRow = [
        { header: 'Food name', body: detailsName, sortable: false, filterField: "food.name" },
        { header: 'Expected Quantity', body: detailsExpected, sortable: false, filterField: false },
        { header: 'Actual Quantity', body: detailsActual, sortable: false, filterField: false },
    ]
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Foods for: {data.animalId.name}</h5>
                <h5>Feeding time: {new Date(data.feedingTime).toLocaleString()}</h5>
                <DataTable value={data.details}
                    filters={filters}
                    globalFilterFields={['food.name']} emptyMessage="No entity found."
                >
                    {expandRow.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} body={col.body}
                            sortable={col.sortable} style={{ minWidth: '150px' }} filterField={col.filterField} />
                    ))}
                    {/* <Column field="id" header="Id" sortable></Column>
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column> */}
                </DataTable>
            </div>
        );
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // 'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // status: { value: null, matchMode: FilterMatchMode.EQUALS },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
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
                <div className=' mb-3 space-x-3'>
                    <Link to="/dashboard/animals/feeding/calendar" state={location.state ? location.state : false}><Button label='View by Calendar' severity='info' /></Link>
                    <Link to="/dashboard/animals/feeding/create" ><Button label='Create' severity='success' /></Link>
                </div>

                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    const handleDeleteClick = (rowData) => {
        setDeleteId(rowData.id)
        openDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        remove(`feeding_schedules/${deleteId}`).then((response) => {
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

    return (
        <div className="p-5">
            {isLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            <Toast ref={toast} />
            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                onHide={() => openDeleteModal(false)}
                footer={deleteModalFooter}
            >
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
            {
                data &&
                <div className='mt-5'>
                    <DataTable
                        size='small'
                        value={data.data}
                        paginator rows={10}
                        filters={filters}
                        globalFilterFields={['id', 'animalId.name', 'animalId.species', 'animalId.origin',]} header={header} emptyMessage="No entity found."
                        loading={isLoading} showGridlines scrollHeight="77vh" scrollable style={{ width: "77vw" }}
                        expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" tableStyle={{ minWidth: '60rem' }}>
                        <Column expander={allowExpansion} style={{ width: '5rem' }} />
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                sortable={col.sortable} style={{ minWidth: '150px' }} filterField={col.filterField} filter />
                        ))}
                    </DataTable>
                </div>
            }
        </div >
    );
}

export default FeedingSchedules
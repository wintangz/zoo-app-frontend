import { Link, useLocation } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { decode, get, remove } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { useEffect } from 'react';
const FeedingSchedules = () => {
    const location = useLocation();
    const [expandedRows, setExpandedRows] = useState(true);
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [filterData, setFilterData] = useState(null);
    const toast = useRef(null);

    const labels = {
        title: 'Feed schedule Management',
        subtitle: 'Table of feed schedule',
        apiPath: '/feeding_schedules',
    }
    const trainerId = parseInt(decode(localStorage.getItem('token')).sub);
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)
    useEffect(() => {
        if (data.data) {
            if (location.state) {
                const filter = data.data.filter(schedule => {
                    return schedule.animalId.id === location.state.id;
                })
                setFilterData(filter)
            } else {

                const filter = data.data.filter(schedule => {
                    return schedule.animalId.trainers.some(trainer => {
                        return trainer.id === trainerId;
                    });
                });
                setFilterData(filter)
            }
        }
    }, [])
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
        return <div className='space-x-2'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined />
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined />
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

    const columns = [
        { field: 'id', header: 'Schedule ID', sortable: true, filterField: "id" },
        { header: 'Avatar', body: avatarBody, sortable: false, filterField: false },
        { field: 'animalId.name', header: 'Animal name', sortable: true, filterField: "animalId.name" },
        { field: 'animalId.species', header: 'Species', sortable: true, filterField: "animalId.species" },
        { field: 'animalId.origin', header: 'Origin', sortable: true, filterField: 'animalId.origin' },
        { header: 'Sex', body: sexBody, sortable: true, filterField: false },
        { header: 'Feeding time', body: feedingTimeBody, sortable: true, filterField: "feedingTime" },
        { header: 'Is Fed', body: isFed, sortable: true, filterField: false },
        { header: 'Actions', body: actionBody, sortable: false, filterField: false },
    ]


    // handle dropdown events


    const allowExpansion = (rowData) => {
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
                <h5>Orders for: {data.animalId.name}</h5>
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
                <Link to="/dashboard/animals/feeding/calendar" state={location.state ? location.state : false}><Button label='View by Calendar' severity='success' /></Link>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    return (
        <div className="p-5">
            {isLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            <Toast ref={toast} />
            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                onHide={() => openDeleteModal(false)}
            // footer={deleteModalFooter}
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
                filterData &&
                <div className='mt-5'>
                    <DataTable
                        value={filterData}
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
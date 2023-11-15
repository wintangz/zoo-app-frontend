import Tippy from '@tippyjs/react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import { FilterMatchMode, FilterOperator } from 'primereact/api';

import React, { useRef, useState } from 'react';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import 'tippy.js/dist/tippy.css';
import { moveOutEnclosure } from '~/api/animalsService';
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

const Animals = () => {

    const [deleteModal, openDeleteModal] = useState(false);
    const [moveout, setMoveout] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [animalMoveout, setAnimalMoveout] = useState(0);
    const [enclosureMoveout, setEnclosureMoveout] = useState(0)
    const toast = useRef(null);

    const labels = {
        title: 'Animal Management',
        subtitle: 'Table of Animals',
        apiPath: '/animals'
    }

    const idBody = (item) => {
        return <div className='flex justify-center items-center font-bold'>{item.id}</div>
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
        return (
            <div class="flex justify-center items-center">
                <Tag value={item.status ?
                    'True' :
                    'False'}
                    className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
            </div>
        )
    }

    const datetime = (item) => {
        return <span>{new Date(item.dateOfBirth).toLocaleString()}</span>
    }
    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };
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

    const handleConfirmMoveout = () => {
        console.log(animalMoveout)
        console.log(enclosureMoveout);
        const res = moveOutEnclosure(animalMoveout, enclosureMoveout)
        res.then((response) => {
            if (response.status === 200) {
                mutate({ ...data })
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Delete successfully', life: 3000 })
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
            }
            setMoveout(false);
        })

    }

    const deleteModalFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => openDeleteModal(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleConfirmDelete} />
        </React.Fragment>
    );

    const moveoutModalFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={() => setMoveout(false)} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleConfirmMoveout} />
        </React.Fragment>
    );
    const handleMoveOut = (item) => {
        setAnimalMoveout(item.id);
        setEnclosureMoveout(item.currentEnclosure.enclosure.id)
        setMoveout(true)
    }
    const role = decode(localStorage.getItem('token')).roles



    const actionBody = (item) => {
        return <div className='space-x-2 flex'>

            <Tippy content='Update' placement='bottom'><Link to="/dashboard/animals/update" state={item}><Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link></Tippy>
            {role.includes("STAFF") && <Tippy content='Delete' placement='bottom'><Link><Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} /></Link></Tippy>}
            {role.includes("ZOO_TRAINER") && <Tippy content='Create Feeding Schedule' placement='bottom'><Link to="/dashboard/animals/feeding" state={item}><Button icon="pi pi-calendar-plus" severity="secondary" aria-label="Bookmark" rounded outlined /></Link></Tippy>}
            {item.currentEnclosure ?
                <Tippy content='Move Out' placement='bottom'><div><Button onClick={() => handleMoveOut(item)} icon='pi pi-directions-alt' className='border-red-500 text-red-500' rounded outlined /></div></Tippy>
                : <Tippy content='Move In' placement='bottom'><Link to="/dashboard/animals/movein" state={item}><Button icon='pi pi-home' className='border-green-500 text-green-500' rounded outlined /></Link></Tippy>}
            {role.includes("STAFF") && <Tippy content='Assign' placement='bottom'><Link to="/dashboard/animals/assign" state={item}><Button icon='pi pi-user-edit' className='border-pink-500 text-pink-500' rounded outlined /></Link></Tippy>}
            {role.includes("STAFF") && <Tippy content='Unassign' placement='bottom'><Link to="/dashboard/animals/unassign" state={item}><Button icon='pi pi-ban' className='border-pink-500 text-pink-500' rounded outlined /></Link></Tippy>}
            <Tippy content='History Cage' placement='bottom'><Link to="/dashboard/animals/history" state={item}><Button icon='pi pi-history' className='border-amber-500 text-amber-500' rounded outlined /></Link></Tippy>
        </div>
    }
    const currentEnclosureBody = (item) => {
        return (
            <>
                {item.currentEnclosure ? item.currentEnclosure.enclosure.name : "No Enclosure"}
            </>
        )
    }
    const { data, mutate, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath); // Assuming get is an asynchronous function fetching the data
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(user => {
                    return {
                        ...user,
                        dateOfBirth: new Date(user.dateOfBirth),
                        createdDate: new Date(user.createdDate) // Convert dateOfBirth to a Date object
                    };
                });
            }
            return data;
        });
    });
    const columns = [
        { field: 'id', header: 'ID', body: idBody, sortable: true, filterField: "id", filter: true },
        { field: 'name', header: 'Name', sortable: true, filterField: "name", filter: true },
        { field: 'origin', header: 'Origin', sortable: true, filterField: "origin", filter: true },
        { header: 'Image', body: avatarBody, sortable: false, filterField: false },
        { field: "arrivalDate", header: 'Arrival Date', body: Arrivaldatetime, dataType: "date", sortable: false, filterField: false, filter: true, filterElement: dateFilterTemplate },
        { field: "dateOfBirth", header: 'Date Of Birth', body: datetime, dataType: "date", sortable: false, filterField: false, filter: true, filterElement: dateFilterTemplate },
        { header: 'Sex', body: sexBody, sortable: true, filterField: false },
        { header: 'Current Enclosure', body: currentEnclosureBody, sortable: true, filterField: "currentEnclosure.enclosure.name", filter: true },
        { field: 'species.name', header: 'Species', sortable: true, filterField: "species.name", filter: true },
        { field: "status", header: 'Status', dataType: "boolean", body: statusBody, sortable: false, filterField: false, filterElement: statusFilterTemplate, filter: true },
        { header: 'Actions', body: actionBody, sortable: false, filterField: false },
    ]

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        origin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'species.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        arrivalDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        dateOfBirth: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
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
                {decode(localStorage.getItem('token')).roles.includes('STAFF') && <Link to="/dashboard/animals/create"><Button label='Create' severity='success' /></Link>}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    const trainerId = parseInt(decode(localStorage.getItem('token')).sub);

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

            <Dialog visible={moveout} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Confirm"
                onHide={() => setMoveout(false)}
                footer={moveoutModalFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        Are you sure you want to move out this animal from cage?
                    </span>
                </div>
            </Dialog>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            <div className='mt-5'>
                <DataTable
                    size='small'
                    value={decode(localStorage.getItem('token')).roles.includes("STAFF") ? data?.data :
                        data?.data.filter(animal => {
                            return animal.animalTrainerAssignors.some(trainer => trainer.trainer.id === trainerId)
                        })
                    }
                    loading={isLoading}
                    showGridlines
                    scrollHeight="77vh"
                    scrollable style={{ width: "77vw" }}
                    filters={filters}
                    paginator rows={10}
                    globalFilterFields={['id', 'name', 'origin', 'species', 'currentEnclosure.enclosure.name', 'createdDate', 'dateOfBirth', 'status']}
                    header={header}
                    emptyMessage="No animal found."
                >
                    {columns.map((col) => (
                        <Column
                            key={col.field}
                            field={col.field}
                            dataType={col.dataType}
                            header={col.header}
                            body={col.body}
                            className='min-w-max'
                            filter={col.filter}
                            sortable={col.sortable}
                            style={{ minWidth: '150px' }}
                            filterElement={col.filterElement}
                            filterField={col.filterField} />
                    ))}
                </DataTable>
            </div>
        </div>
    )
}

export default Animals
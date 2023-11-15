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
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
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

const Users = () => {
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);
    const navigate = useNavigate(null)
    const labels = {
        title: 'User Management',
        subtitle: 'Table of Users',
        apiPath: '/users'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath); // Assuming get is an asynchronous function fetching the data
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(user => {
                    return {
                        ...user,
                        dateOfBirth: new Date(user.dateOfBirth) // Convert dateOfBirth to a Date object
                    };
                });
            }
            return data;
        });
    });
    const avatarBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.avatarUrl} alt={item.id} />
    }

    const sexBody = (item) => {
        return <Tag value={item.sex ?
            <div className='flex items-center'><BsGenderMale className='mr-1' />Male</div> :
            <div className='flex items-center'><BsGenderFemale className='mr-1' />Female</div>}
            className={`{${item.sex ? 'bg-blue-400' : 'bg-pink-300'}} p-2 text-[0.9rem]`} />
    }

    const roleBody = (item) => {
        let tagValue, tagColor;

        switch (item.roles[0].name) {
            case "STAFF":
                tagValue = <div className='flex items-center'>STAFF</div>;
                tagColor = 'bg-red-500';
                break;
            case "ZOO_TRAINER":
                tagValue = <div className='flex items-center'>ZOO_TRAINER</div>;
                tagColor = 'bg-blue-400';
                break;
            case "CUSTOMER":
                tagValue = <div className='flex items-center'>CUSTOMER</div>;
                tagColor = 'bg-green-500';
                break;
            default:
                tagValue = <div className='flex items-center'>ADMIN</div>;
                tagColor = 'bg-yellow-400';
                break;
        }

        return (
            <Tag
                value={tagValue}
                className={`${tagColor} p-2 text-[0.9rem]`}
            />
        );
    }


    const statusBody = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const dateOfBirthBody = (item) => {
        return <span>{new Date(item.dateOfBirth).toLocaleString()}</span>
    }

    const actionBody = (item) => {
        return <div className='space-x-2'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined onClick={() => navigate(`/dashboard/users/update/${(item.id)}`)} tooltip="Update" tooltipOptions={{ position: 'bottom' }} />
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

    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => {
                    console.log(options)
                    console.log(e)
                    options.filterCallback(e.value, options.index)
                }}
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
                mask="99/99/9999"
            />
        );
    };

    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id", filter: true },
        { header: 'Avatar', body: avatarBody },
        { field: 'username', header: 'Username', sortable: true, filterField: "username", filter: true },
        { field: 'firstname', header: 'First Name', sortable: true, filterField: "firstname", filter: true },
        { field: 'lastname', header: 'Last Name', sortable: true, filterField: "lastname", filter: true },
        { header: 'Sex', body: sexBody, sortable: true, filterField: "sex" },
        { header: 'Date of Birth', body: dateOfBirthBody, sortable: true, dataType: 'date', filterElement: dateFilterTemplate, filterField: 'dateOfBirth', filter: true },
        { field: 'email', header: 'Email', sortable: true, filterField: "email", filter: true },
        { field: 'phone', header: 'Phone', sortable: true, filterField: "phone" },
        { field: 'address', header: 'Address', sortable: true, filterField: "address" },
        { field: 'nationality', header: 'Nationality', sortable: true, filterField: "nationality", filter: true },
        { field: 'roles[0].name', header: 'Role', body: roleBody, sortable: false, filterField: "roles[0].name", filter: true },
        { header: 'Status', body: statusBody, dataType: "boolean", filterField: "status", filter: true, filterElement: statusFilterTemplate },
        { header: 'Actions', body: actionBody },
    ]

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        lastname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        firstname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        dateOfBirth: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        nationality: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'roles[0].name': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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
                <Link to="/dashboard/users/create"><Button label='Create' severity='success' /></Link>
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
                        header={header}
                        paginator rows={10}
                        globalFilterFields={['id', 'username', 'lastname', 'firstname', 'email', 'status', 'dateOfBirth', 'nationality']}
                        emptyMessage="No users found.">
                        {columns.map((col) => (
                            (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                    sortable={col.sortable}
                                    filter={col.filter}
                                    filterElement={col.filterElement}
                                    filterPlaceholder={`Search by ${col.header.toLowerCase()}`}
                                    filterField={col.filterField}
                                    dataType={col.dataType}
                                    style={(col.header === 'Actions' && { minWidth: '8.75rem' })
                                    }
                                />
                            )
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Users
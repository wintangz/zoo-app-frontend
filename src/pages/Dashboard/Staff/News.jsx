import { FilterMatchMode } from 'primereact/api';
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

const News = () => {

    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const navigate = useNavigate(null)
    const toast = useRef(null);

    const labels = {
        title: 'News Management',
        subtitle: 'Table of News',
        apiPath: '/news'
    }

    const idBody = (item) => {
        return <div className='flex justify-center items-center font-bold'>{item.id}</div>
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath);
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

    const imgUrl = (rowData) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={rowData.imgUrl} alt={rowData.id} />
    };

    const thumbnailUrl = (rowData) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={rowData.thumbnailUrl} alt={rowData.id} />
    };
    const createdDate = (rowData) => {
        return <>{(new Date(rowData.createdDate).toLocaleString())}</>;
    };

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

    const type = (item) => {
        const typeColor = item.type === 'Event' ? 'text-yellow-500' : 'text-green-400';
        const typeText = item.type === 'Event' ? 'Event' : 'Info';

        return (
            <span className={`${typeColor} p-2 text-[0.9rem]`}>
                {typeText}
            </span>
        );
    };

    const actionBody = (item) => {
        return <div className='space-x-2'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined tooltip="Update" tooltipOptions={{ position: 'bottom' }} onClick={() => navigate(`/dashboard/news/update/${(item.id)}`)} />
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => handleDeleteClick(item)} />
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
    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...';
        }
        return text;
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };



    const columns = [
        { field: 'id', header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { field: 'title', header: 'Title', body: (rowData) => <span>{truncateText(rowData.title, 30)}</span>, sortable: true, filterField: "title" },
        { field: 'shortDescription', header: 'Short Description', body: (rowData) => <span>{truncateText(rowData.shortDescription, 200)}</span>, sortable: true, filterField: "shortDescription" },
        { field: 'content', header: 'Content', body: (rowData) => <span>{truncateText(rowData.shortDescription, 200)}</span>, sortable: true, filterField: "content" },
        { header: 'ImgUrl', body: imgUrl, showFilterMenu: false },
        { header: 'ThumbnailUrl', body: thumbnailUrl, filterField: false, showFilterMenu: false },
        { field: 'type', header: 'Type', body: type, sortable: true, filterField: "type", showFilterMenu: false },
        { header: 'Created Date', body: createdDate, sortable: false, filterField: "createdDate", filterElement: dateFilterTemplate, dataType: 'date' },
        { field: "status", header: 'Status', dataType: "boolean", body: statusBody, sortable: false, filterField: false, filterElement: statusFilterTemplate },
        { header: 'Action', body: actionBody, filterField: false, showFilterMenu: false },
    ];

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        shortDescription: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        content: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
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
                <Link to="/dashboard/news/create"><Button label='Create' severity='success' /></Link>
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
                        header={header}
                        paginator rows={10}
                        globalFilterFields={['id', 'title', 'content', 'type', 'shortDescription', 'status', 'createdDate']}
                        emptyMessage="No news found."
                    >
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                sortable={col.sortable}
                                style={(col.header === 'Content' && { minWidth: '20rem' }) ||
                                    (col.header === 'Short Description' && { minWidth: '20rem' }) ||
                                    (col.header === 'ThumbnailUrl' && { minWidth: '10rem' }) ||
                                    (col.header === 'ImgUrl' && { minWidth: '10rem' }) ||
                                    (col.header === 'Actions' && { minWidth: '8.75rem' })
                                }
                                filter={col.filter}
                                filterField={col.filterField}
                                filterPlaceholder={`Search by ${col.header.toLowerCase()}`}
                                filterElement={col.filterElement}
                                dataType={col.dataType}
                                showFilterMenu={col.showFilterMenu}
                            />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default News
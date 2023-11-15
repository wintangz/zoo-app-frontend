import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from '../AxiosClient'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import Tippy from '@tippyjs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Link } from 'react-router-dom';

const HealthRecords = () => {
    const toast = useRef(null);

    const labels = {
        title: 'Health Record Management',
        subtitle: 'Table of Health Records',
        apiPath: '/health_records'
    }

    const idBody = (item) => {
        return <div className='flex justify-center items-center font-bold '>{item.id}</div>
    }

    const idAnimalName = (item) => {
        return <div className='w-60'>{item.animal.name}</div>
    }

    const imgBody = (item) => {
        return (
            <div className='w-32 h-16 shadow-2 rounded-md '>
                <img className="w-32 h-16 rounded-md object-cover" src={item.imgUrl} alt={item.name} />
            </div>
        )
    }
    const imgAnimalBody = (item) => {
        return (
            <div className='w-32 h-16 shadow-2 rounded-md '>
                <img className="w-32 h-16 rounded-md object-cover" src={item.animal.imgUrl} alt={item.name} />
            </div>
        )
    }

    const recordDateTimeBody = (item) => {
        return <span>{new Date(item.recordedDateTime).toLocaleString()}</span>
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const actionBody = (item) => {
        return <div className='space-x-1 justify-center'>
            <Tippy content='Update' placement='bottom'><Link to="/dashboard/animals/health/update" state={item}> <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link></Tippy>
        </div>
    }

    const columns = [
        { field: 'id', header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { header: 'Image', body: imgBody, sortable: false, showFilterMenu: false },
        { field: 'animal.name', header: 'Animal Name', body: idAnimalName, sortable: true, filterField: "animal.name" },
        { field: 'diagnosis', header: 'Diagnosis', sortable: true, filterField: "diagnosis" },
        { field: 'height', header: 'Height', sortable: true, filterField: "height" },
        { field: 'length', header: 'Length', sortable: true, filterField: "length" },
        { field: 'weight', header: 'Weight', sortable: true, filterField: "weight" },
        { field: 'temperature', header: 'Temperature', sortable: true, filterField: "temperature" },
        { field: 'lifeStage', header: 'Life Stage', sortable: true, filterField: "lifeStage" },
        { field: "recordedDateTime", header: 'Record Date', body: recordDateTimeBody, dataType: "date", sortable: false, filterField: false, filterElement: dateFilterTemplate },
        { field: 'animal.imgUrl', header: 'Animal Image', body: imgAnimalBody, sortable: false, showFilterMenu: false },
        { header: 'Action', body: actionBody, sortable: false, showFilterMenu: false },
    ]

    const { data, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath); // Assuming get is an asynchronous function fetching the data
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(user => {
                    return {
                        ...user,
                        recordedDateTime: new Date(user.recordedDateTime) // Convert dateOfBirth to a Date object
                    };
                });
            }
            return data;
        });
    });

    console.log(data);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'animal.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        diagnosis: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        height: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        length: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        weight: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temperature: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lifeStage: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        recordedDateTime: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
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
                <Link to="/dashboard/animals/health/create"><Button label='Create' severity='success' /></Link>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();

    console.log(data)
    return (
        <div className='p-5 '>
            {isLoading && <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
            <Toast ref={toast} />

            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5 overflow-x-auto'>
                    <DataTable value={data.data}
                        loading={isLoading}
                        size='small'
                        showGridlines scrollHeight="77vh"
                        scrollable
                        style={{ width: "77vw" }}
                        filters={filters}
                        paginator rows={10}
                        globalFilterFields={['id', 'animal.name', 'diagnosis', 'height', 'length', 'weight', 'temperature', 'lifeStage', 'recordedDateTime']}
                        header={header}
                        emptyMessage="No Health Record found."
                    >
                        {columns.map((col) => (
                            <Column key={col.field}
                                dataType={col.dataType}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                                sortable={col.sortable}
                                className='min-w-max'
                                filter
                                filterField={col.filterField}
                                filterElement={col.filterElement}
                                showFilterMenu={col.showFilterMenu} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default HealthRecords
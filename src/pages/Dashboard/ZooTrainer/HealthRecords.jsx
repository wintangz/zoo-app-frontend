import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from '../AxiosClient'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Link } from 'react-router-dom';

const HealthRecords = () => {
    const toast = useRef(null);

    const labels = {
        title: 'Health Record Management',
        subtitle: 'Table of Health Records',
        apiPath: '/health_records'
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

    const recordDateTimeBody = (item) => {
        return <span>{new Date(item.recordedDateTime).toLocaleString()}</span>
    }

    const actionBody = (item) => {
        return <div className='space-x-1 justify-center'>
            <Link to="/dashboard/animals/health/update" state={item}> <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined /></Link>
        </div>
    }

    const columns = [
        { header: 'ID', body: idBody, sortable: true, filterField: "id" },
        { field: 'animal.name', header: 'Animal Name', sortable: true, filterField: "animal.name" },
        { field: 'diagnosis', header: 'Diagnosis', sortable: true, filterField: "diagnosis" },
        { field: 'height', header: 'Height', sortable: true, filterField: "height" },
        { field: 'length', header: 'Length', sortable: true, filterField: "length" },
        { field: 'weight', header: 'Weight', sortable: true, filterField: "weight" },
        { field: 'temperature', header: 'Temperature', sortable: true, filterField: "temperature" },
        { field: 'lifeStage', header: 'Life Stage', sortable: true, filterField: "lifeStage" },
        { header: 'Record Date', body: recordDateTimeBody, sortable: false, filterField: false },
        { header: 'Image', body: imgBody, sortable: false, filterField: false },
        { header: 'Action', body: actionBody, sortable: false, filterField: false },
    ]

    const { data, isLoading } = useSWR(labels.apiPath, get)

    console.log(data);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        diagnosis: { value: null, matchMode: FilterMatchMode.IN },
        height: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        length: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        weight: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temperature: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lifeStage: { value: null, matchMode: FilterMatchMode.IN },
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
                        showGridlines scrollHeight="77vh"
                        scrollable
                        style={{ width: "77vw" }}
                        filters={filters}
                        paginator rows={10}
                        globalFilterFields={['id', 'animal.name', 'diagnosis', 'height', 'length', 'weight', 'temperature', 'lifeStage']}
                        header={header}
                        emptyMessage="No Health Record found."
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

export default HealthRecords
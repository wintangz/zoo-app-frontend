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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { get, remove } from '../AxiosClient';
import { useEffect } from 'react';
import { getEnclosuresAnimals } from '~/api/animalsService';

function AnimalHistory() {
    const location = useLocation();
    const [enclosure, setEnclosures] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await getEnclosuresAnimals();
            const allEnclosures = res.filter(enclosure => enclosure.animal.id === location.state.id);
            setEnclosures(allEnclosures);
        };
        fetchData();
    }, []);
    console.log(enclosure);
    const moveoutdate = (item) => {
        return <span>{item.moveOutDate ? new Date(item.moveOutDate).toLocaleString() : " "}</span>
    }

    const labels = {
        title: 'History Of Animal',
        subtitle: 'Table of history enclosures',
        apiPath: '/users/customers'
    }

    const moveindate = (item) => {
        return <span>{new Date(item.moveInDate).toLocaleString()}</span>
    }
    const imgBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.enclosure.imgUrl} alt={item.enclosure.id} />
    }
    const columns = [
        { field: 'enclosure.id', header: 'Enclosure ID', sortable: true, filterField: "enclosure.id" },
        { field: 'enclosure.name', header: 'Enclosure Name', sortable: true, showFilterMenu: "enclosure.name" },
        { field: 'enclosure.info', header: 'Info', sortable: true, filterField: "enclosure.info" },
        { field: 'enclosure.maxCapacity', header: 'Max Capacity', sortable: true, filterField: "enclosure.maxCapacity" },
        { header: 'Move in Date', body: moveindate, sortable: false, showFilterMenu: false },
        { header: 'Move out Date', body: moveoutdate, sortable: false, showFilterMenu: false },
        { header: 'Enclosure Image', body: imgBody, sortable: false, showFilterMenu: false },
    ]

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
            <div className="flex justify-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();
    return (
        <div className=' p-5'>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {enclosure && <DataTable
                className='mt-5'
                size='small'
                value={enclosure}
                showGridlines
                scrollHeight="77vh"
                scrollable style={{ width: "77vw" }}
                filters={filters}
                paginator rows={10}
                globalFilterFields={['enclosure.id', 'enclosure.name', 'enclosure.info', 'enclosure.maxCapacity']}
                header={header}
                emptyMessage="No enclosure found."
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
            </DataTable>}
        </div>
    );
}

export default AnimalHistory;
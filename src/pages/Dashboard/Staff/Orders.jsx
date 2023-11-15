import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { useState } from 'react';
import useSWR from 'swr';
import 'tippy.js/dist/tippy.css';
import { getOrderDetailByOderId } from '~/api/orderService';
import { get } from '../AxiosClient';

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
const Orders = () => {

    const labels = {
        title: 'Orders Management',
        subtitle: 'Table of Orders',
        apiPath: '/orders'
    }

    const [expandedRows, setExpandedRows] = useState(true);

    const { data, isLoading } = useSWR(labels.apiPath, () => {
        const response = get(labels.apiPath);
        return response.then((data) => {
            if (data && data.data) {
                data.data = data.data.map(news => {
                    const createdDate = new Date(news.createdDate);
                    const currentDate = new Date();
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
                    if (createdDate < thirtyDaysAgo) {
                        news.status = false;
                    }
                    return {
                        ...news,
                        createdDate: new Date(news.createdDate)
                    };
                });
            }
            return data;
        });
    });
    const createdDate = (rowData) => {
        return <>{(new Date(rowData.createdDate).toLocaleString())}</>;
    };

    const status = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const customerFullName = (rowData) => {
        return `${rowData.customer.lastname} ${rowData.customer.firstname}`;
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };
    //

    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id", filter: true },
        { field: 'customer.username', header: 'Customer', body: customerFullName, sortable: true, filterField: "customer", filter: true },
        { field: 'paymentMethod', header: 'Payment Method', sortable: false, filterField: "paymentMethod", filter: false },
        { header: 'Created Date', body: createdDate, sortable: true, filterField: "createdDate", filterElement: dateFilterTemplate, dataType: 'date', filter: true },
        { field: "status", header: 'Status', dataType: "boolean", body: status, sortable: true, filter: true, filterField: false, filterElement: statusFilterTemplate },
    ];

    //

    const [ordersTicketsResult, setOrdersTicketsResult] = useState(null);
    const fetchApi = async (values) => {
        const resultTitle = await getOrderDetailByOderId(values);
        setOrdersTicketsResult(resultTitle.data);
    };

    const allowExpansion = (rowData) => {
        console.log(rowData);
        return rowData.id !== 0;
    };

    const checked = (item) => {
        return item.checkedBy ? item.checkedBy.username : 'Not Checked';
    };
    const expandRow = [
        { field: 'id', header: 'ID' },
        { field: 'ticket.name', header: 'Name', filterField: "name", filter: true },
        { field: 'ticket.description', header: 'Description', filterField: "description", filter: true },
        { field: 'ticket.price', header: 'Price', filterField: "price", filter: true },
        { field: 'checked', header: 'Checked', filterField: "isChecked", filter: true },
        { header: 'Checked By', field: 'checkedBy.username', sortable: false, filterField: false, body: checked },
    ]
    console.log(ordersTicketsResult);
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Order ID: {data.id}</h5>
                <h5>Customer: {data.customer.firstname}</h5>
                <h5>Cretaed Date: {new Date(data.createdDate).toLocaleString()}</h5>
                {ordersTicketsResult && <DataTable value={ordersTicketsResult}
                    filters={filters}
                    globalFilterFields={['customer.username']} emptyMessage="No entity found."
                >
                    {expandRow.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} body={col.body}
                            sortable={col.sortable} style={{ minWidth: '150px' }} filterField={col.filterField} />
                    ))}
                </DataTable>}
            </div>
        );
    };
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        createdDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
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
                {/* <Link to="/dashboard/foods/create"><Button label='Create' severity='success' /></Link> */}
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
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable
                        value={data.data}
                        loading={isLoading}
                        showGridlines
                        scrollHeight="77vh"
                        scrollable
                        style={{ width: "77vw" }}
                        filters={filters}
                        header={header}
                        paginator rows={10}
                        globalFilterFields={['id', 'type', 'status', 'createdDate', 'creator', 'quantity']}
                        emptyMessage="No orders found."
                        dataKey="id" tableStyle={{ minWidth: '60rem' }}
                        expandedRows={expandedRows}
                        onRowToggle={(e) => {
                            setExpandedRows(e.data)
                            const expandedRowIndex = Object.keys(e.data).find((key) => e.data[key]);
                            if (expandedRowIndex !== undefined) {
                                fetchApi(expandedRowIndex);
                            }
                        }}
                        rowExpansionTemplate={rowExpansionTemplate}
                    >
                        <Column expander={allowExpansion} style={{ width: '5rem' }} />
                        {columns.map((col) => (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={col.body}
                                sortable={col.sortable}
                                style={(col.header === 'Content' && { minWidth: '20rem' }) ||
                                    (col.header === 'Actions' && { minWidth: '8.75rem' })
                                }
                                filter={col.filter}
                                filterField={col.filterField}
                                filterPlaceholder={`Search by ${col.header.toLowerCase()}`}
                                filterElement={col.filterElement}
                                dataType={col.dataType}
                            />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Orders
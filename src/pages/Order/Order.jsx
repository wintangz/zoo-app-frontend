import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { getOrderByCusId, getOrderDetailByOderId } from "~/api/orderService";
import img from '~/assets/img/t2.jpg';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import { decode } from "~/utils/axiosClient";

function Order() {
    const [expandedRows, setExpandedRows] = useState(true);
    const [orders, setOrders] = useState();
    const id = decode(localStorage.getItem('token')).sub;
    useEffect(() => {
        const res = getOrderByCusId(id)
        res.then(result => {
            console.log(result);
            setOrders(result)
        })
    }, [])
    const createdDate = (rowData) => {
        return <>{(new Date(rowData.createdDate).toLocaleString())}</>;
    };

    const status = (item) => {
        const isStatusTrue = item.status;
        const isCreatedDateValid = new Date() - new Date(item.createdDate) <= 30 * 24 * 60 * 60 * 1000;

        return (
            <Tag
                value={isStatusTrue && isCreatedDateValid ? 'True' : 'False'}
                className={`${isStatusTrue && isCreatedDateValid ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`}
            />
        );
    }
    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id", filter: true },
        { field: 'paymentMethod', header: 'Payment Method', sortable: false, filterField: "paymentMethod", filter: false },
        { field: 'total', header: 'Total Amoun', sortable: true, filterField: "total", filter: false },
        { field: 'createdDate', header: 'Created Date', body: createdDate, sortable: true, filterField: "createdDate", dataType: 'date', filter: true },
        { field: "status", header: 'Status', dataType: "boolean", body: status, sortable: true, filter: true, filterField: false },
    ];
    const [ordersTicketsResult, setOrdersTicketsResult] = useState(null);
    const fetchApi = async (values) => {
        const resultTitle = await getOrderDetailByOderId(values);
        console.log(resultTitle);
        setOrdersTicketsResult(resultTitle.data);
    };

    const allowExpansion = (rowData) => {
        console.log(rowData);
        return rowData.id !== 0;
    };

    const checkedByStatus = (item) => {
        return item.checkedBy ? item.checkedBy.username : 'Not Checked';
    };
    const expandRow = [
        { field: 'id', header: 'ID' },
        { field: 'ticket.name', header: 'Name', filterField: "name", filter: true },
        { field: 'ticket.description', header: 'Description', filterField: "description", filter: true },
        { field: 'ticket.price', header: 'Price', filterField: "price", filter: true },
        { field: 'checked', header: 'Checked', filterField: "isChecked", filter: true },
        { header: 'Checked By', field: 'checkedBy.username', sortable: false, filterField: false, body: checkedByStatus },
    ]
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
            <div className="flex justify-content-between items-center">
                <h1 className='text-4xl text-yellow-500 justify-center'>View Orders</h1>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();
    const backgroundImageStyle = {
        backgroundImage: `url(${img})`,
    };
    return (
        <>
            <div style={backgroundImageStyle}><NormalBanner /></div>
            <div className='p-5 flex justify-center items-center'>
                {orders &&
                    <div className='m-5' style={{ width: '90%' }}>
                        <DataTable
                            value={orders}
                            showGridlines
                            scrollHeight="77vh"
                            scrollable
                            style={{ width: "100%" }}
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
        </>
    );;
}

export default Order;
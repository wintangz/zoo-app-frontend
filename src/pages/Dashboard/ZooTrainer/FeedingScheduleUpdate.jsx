import Tippy from "@tippyjs/react";
import moment from "moment/moment";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useSWR from "swr";
import { updateSchedule } from "~/api/animalsService";
import { getFood } from "~/api/foodService";
import { get } from "~/utils/axiosClient";

function FeedingScheduleUpdate() {
    const location = useLocation()


    const [selectedDate, setSelectedDate] = useState(new Date(location.state.feedingTime));
    const labels = {
        title: 'Feeding Schedule Management',
        subtitle: 'Update FeedingSchedule',
        apiPath: '/foods'
    }
    const [submittedValue, setSubmittedValue] = useState({
        animalId: location?.state.animalId,
        details: location?.state.details,
        feedingTime: selectedDate
    });
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)

    const handleDeleteClick = (item, index) => {
        submittedValue.details.splice(index.rowIndex, 1);
        const products = location.state.details.splice(index.rowIndex, 1);
        setProducts(products);
        setSubmittedValue(submittedValue);

    }
    const actionBody = (item, index) => {
        return <div className='space-x-2'>
            <Tippy content='Delete' placement='bottom'><Button type="button" icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item, index)} /></Tippy>
        </div>
    }

    const columns = [
        { field: 'id', header: 'ID', sortable: true, filterField: "id" },
        { field: 'food.name', header: 'Food Name', sortable: true, filterField: "food.name" },
        { field: 'food.type', header: 'Food Type', sortable: true, filterField: "food.type" },
        { field: 'expectedQuantity', header: 'Expected Quantity', sortable: true, filterField: "expectedQuantity" },
        { field: 'actualQuantity', header: 'Actual Quantity', sortable: true, filterField: "actualQuantity" },
        { header: "Action", body: actionBody, sortable: false, filterField: false },
    ]

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };



    // ----------------------------- Add new food ---------------------------//
    let emptyProduct = {
        id: 15,
        food: {
            name: null,
            type: null,
        },
        foodId: 0,
        expectedQuantity: null,
        actualQuantity: 0,
    };
    const [products, setProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [submittedQuantity, setSubmittedQuantity] = useState(false);
    const dt = useRef(null);
    const toast = useRef(null);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(true);
        setSubmittedQuantity(true);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(true);
        setSubmittedQuantity(true);
        setProductDialog(false);
    };

    const saveProduct = () => {
        let _products = [...location.state.details];
        let _product = { ...product };
        console.log(_product);
        if (_product.expectedQuantity == null && !_product.foodId) {
            setSubmitted(false);
            setSubmittedQuantity(false);
        } else if (!_product.foodId) {
            setSubmitted(false);
        } else if (_product.expectedQuantity === null) {
            setSubmittedQuantity(false)
        } else {
            setSubmittedQuantity(true)
            setSubmitted(true);
            console.log(_product)
            const filter = data.data.filter(food => food.id === _product.foodId)
            _product.food = filter[0]

            console.log(location.state);
            const productSubmit = location.state.details.map(product => {
                return {
                    foodId: product.food.id,
                    expectedQuantity: product.expectedQuantity
                }
            });
            productSubmit.push({ foodId: _product.foodId, expectedQuantity: _product.expectedQuantity });
            console.log(location.state)
            const submit = {
                animalId: location.state.animalId.id,
                details: productSubmit,
                feedingTime: moment(new Date(selectedDate)).format("YYYY-MM-DDTHH:mm:ss")
            }
            console.log(submit)
            setSubmittedValue(submit);
            _products.push(_product);
            console.log(_product)
            const locateFilter = location.state.details.filter(food => {
                return food.food.id === _product.foodId
            })
            console.log(locateFilter.length);
            if (locateFilter.length !== 0) {
                location.state.details.map(food => {
                    if (food.food.id === _product.foodId) {
                        return food.expectedQuantity += _product.expectedQuantity
                    }
                })
            } else {
                location.state.details.push(_product)
            }
            // // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const handleUpdate = () => {
        submittedValue.feedingTime = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
        const res = updateSchedule(location.state.id, submittedValue)
        res.then((result) => {
            console.log(result);
        })
    }

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </>
    );
    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header = renderHeader();
    return (
        <div>
            <div className="p-5 w-[80vw]">
                {/* <Toast ref={toast} /> */}
                <div className="p-m-5 w-[100%]">
                    <div >
                        <p className='text-3xl font-bold'>{labels.title}</p>
                        <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                    </div>
                    {location &&
                        <div className="p-field flex-col flex mt-6">
                            <label htmlFor="name">Animal Name</label>
                            <InputText value={location.state.animalId.name} className="w-[30%]" disabled />
                        </div>}


                    <div className='w-[50%] flex-col flex mt-4'>
                        <label htmlFor="feedingTime">Feeding Time</label>
                        <Calendar
                            inputId='feedingTime'
                            name='feedingTime'
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.value)}
                            showTime hourFormat="24"
                            showIcon />
                    </div>

                    <div className="card mt-4">
                        {location &&
                            <DataTable ref={dt} size='small' value={location.state.details} showGridlines scrollHeight="25vh" scrollable style={{ width: "77vw" }}
                                filters={filters} filterDisplay="row"
                                globalFilterFields={['id', 'food.name', 'food.type', 'actualQuantity', 'expectedQuantity']} header={header} emptyMessage="No item found."
                            >
                                {columns.map((col) => (
                                    <Column key={col.field} field={col.field} header={col.header} body={col.body}
                                        sortable={col.sortable} style={{ minWidth: '150px' }} filterField={col.filterField} />
                                ))}
                            </DataTable>}

                        <Button className="mt-6 float-right" label="Update" severity="success" onClick={handleUpdate} />

                        <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            <div className="field">
                                <label htmlFor="name" className="font-bold">
                                    Name
                                </label>
                                <Dropdown id="name" options={data?.data} optionLabel='name' optionValue='id' value={product.foodId} onChange={(e) => onInputChange(e, 'foodId')} required autoFocus className={classNames({ 'p-invalid': !submitted && !product.foodId })} />
                                {!submitted && <small className="p-error">Name is required.</small>}
                            </div>

                            <div className="formgrid grid">

                                <div className="field col">
                                    <label htmlFor="quantity" className="font-bold">
                                        Quantity
                                    </label>
                                    <InputNumber id="quantity" value={product.expectedQuantity} onValueChange={(e) => onInputNumberChange(e, 'expectedQuantity')}
                                        className={classNames({ 'p-invalid': !submittedQuantity && !product.expectedQuantity })}
                                    />
                                    {!submittedQuantity && <small className="p-error">Quantity is required.</small>}
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default FeedingScheduleUpdate;
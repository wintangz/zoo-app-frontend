import dayjs from 'dayjs';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import * as yup from 'yup';
import { createFeedingSchedule } from '~/api/animalsService';
import { createFood, getFood } from '~/api/foodService';
import { decode, get, post } from '../AxiosClient';
import { Dropdown } from 'primereact/dropdown';
import Tippy from '@tippyjs/react';
import { InputNumber } from 'primereact/inputnumber';

function FeedingSchedulesCreate() {
    const trainerId = parseInt(decode(localStorage.getItem('token')).sub)

    const navigate = useNavigate();
    const [foods, setFoods] = useState(false);
    const toast = useRef(null);
    const [food, setFood] = useState(null);
    const [foodDetails, setFoodDetails] = useState([]);
    const [dataFood, setDataFood] = useState(null);
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [foodidRequired, setFoodidRequired] = useState(false);
    const [expectedQuantityRequired, setexpectedQuantityRequired] = useState(false);
    const initialValues = {
        animalId: '',
        foodId: '',
        expectedQuantity: 0,
        feedingTime: "",
    };

    const userSchema = yup.object().shape({
        foodId: yup.string().nullable(true),
        // expectedQuantity: yup.string().nullable(true),
        animalId: yup.string().nullable(true),
        feedingTime: yup.string((values) => console.log(values))
            .required("Feeding is required")
    });

    const labels = {
        title: 'Feeding Schedule Management',
        subtitle: 'Create FeedingSchedule',
        apiPath: '/animals'
    }
    useEffect(() => {
        const res = getFood();
        res.then(food => {
            setDataFood(food);
        })
    }, [])
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get);

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {

            try {
                // values.expectedQuantity = parseInt(values.expectedQuantity);
                // const response = await createFeedingSchedule({ ...values });
                // if (response.status === 200) {
                //     setFoods(true);
                //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create food successfully', life: 3000 })
                //     resetForm();
                // } else {
                //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                // }
                values.animalId = selectedAnimal
                values.details = foodDetails;
                delete values.expectedQuantity;
                delete values.foodId;
                const res = createFeedingSchedule(values)
                res.then((result) => {
                    if (result.status === 200) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create food successfully', life: 3000 })
                        formik.resetForm();
                        setSelectedAnimal(null);
                        setFoodDetails([]);
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                    }
                })
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },

    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


    const handleAddRow = () => {
        setFoodDetails(prev => [...prev, { foodId: selectedFood, expectedQuantity: formik.values.expectedQuantity }]);
        formik.resetForm();
    }


    const handleDeleteDetails = (index) => {
        const updatedFoodDetails = [...foodDetails];
        updatedFoodDetails.splice(index, 1);

        setFoodDetails(updatedFoodDetails);
    }





    useEffect(() => {
    }, [foodDetails.length]);
    return (
        <div className="p-5 w-[80vw]">
            <Toast ref={toast} />
            {/* <Dialog
                header="Create Food Successfully!"
                visible={foods}
                style={{ width: '400px' }}
                onHide={handleClose}
            >
                <p>New food has been added to the Database!</p>
                <Button
                    label="Close"
                    icon="pi pi-times"
                    onClick={handleClose}
                />
            </Dialog> */}

            <div className="p-m-5 w-[100%]">
                <div >
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Animal Name</label>
                        <Dropdown value={selectedAnimal} onChange={(e) => {
                            console.log(e.target.value.toString());
                            setSelectedAnimal(e.target.value);
                            formik.handleChange(e.target.value.toString(), "id");
                        }} options={data ? data?.data.filter(animal => {
                            return animal.animalTrainerAssignors.some(trainer => trainer.trainer.id === trainerId)
                        }) : null} optionLabel="name" optionValue='id'
                            placeholder="Select animal" className="w-full md:w-14rem" />
                        {formik.errors.name && formik.touched.name && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.name}
                            </small>
                        )}
                    </div>



                    <div className='w-[50%]'>
                        <label htmlFor="feedingTime">Feeding Time</label>
                        <Calendar
                            inputId='feedingTime'
                            name='feedingTime'
                            value=""
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.handleChange({ target: { name: 'feedingTime', value: moment(e.target.value).format("YYYY-MM-DDThh:mm:ss") } });
                            }}
                            showTime hourFormat="24"
                            className={classNames({ 'p-invalid': isFormFieldInvalid('feedingTime') })}
                            showIcon />
                        {formik.errors.feedingTime && formik.touched.feedingTime && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.feedingTime}
                            </small>
                        )}
                    </div>




                    <div>
                        {foodDetails.map((foodDetail, index) => {
                            return (
                                <div className='flex mt-4 mb-4 shadow-xl p-4 bg-neutral-300 w-[100%] rounded justify-between '>
                                    <div className='flex'>
                                        <div className="p-field flex mr-4">
                                            <label htmlFor="foodId" className='w-[40%] flex justify-center items-center mr-2'>Food Name</label>
                                            <Dropdown
                                                disabled={true}
                                                value={foodDetail.foodId} onChange={(e) => {
                                                    setSelectedFood(e.target.value);
                                                    formik.handleChange(e.target.value.toString(), "foodId");
                                                }} options={dataFood ? dataFood : null} optionLabel="name" optionValue='id'
                                                placeholder="Select food" className="w-full md:w-14rem" />
                                            {formik.errors.foodId && formik.touched.foodId && (
                                                <small className='text-red-500 font-bold'>
                                                    {formik.errors.foodId}
                                                </small>
                                            )}
                                        </div>
                                        <div className="p-field flex w-[300px]">
                                            <label htmlFor="expectedQuantity" className=' flex justify-center items-center mr-2 '>Expected Quantity</label>
                                            <InputText
                                                id="expectedQuantity"
                                                name="expectedQuantity"
                                                disabled={true}

                                                value={foodDetail.expectedQuantity}
                                            />

                                        </div>
                                    </div>
                                    <Tippy content="Remove Food Detail" ><Button type='button' icon="pi pi-trash" rounded outlined aria-label="Filter" onClick={() => {
                                        handleDeleteDetails(index)
                                    }} /></Tippy>
                                </div>
                            )
                        })}
                        <div className='flex mt-4 mb-4 shadow-xl p-4 bg-neutral-300 w-[100%] rounded justify-between '>
                            <div className='flex'>
                                <div className="p-field flex mr-4">
                                    <label htmlFor="foodId" className='w-[40%] flex justify-center items-center mr-2'>Food Name</label>
                                    <Dropdown value={selectedFood} onChange={(e) => {
                                        setSelectedFood(e.target.value);
                                        formik.handleChange(e.target.value.toString(), "foodId");
                                    }} options={dataFood ? dataFood : null} optionLabel="name" optionValue='id'
                                        placeholder="Select food" className="w-full md:w-14rem" />
                                    {foodidRequired && <small className='text-red-500 font-bold'>
                                        Food Id is required
                                    </small>}
                                </div>
                                <div className="p-field flex w-[300px]">
                                    <label htmlFor="expectedQuantity" className=' flex justify-center items-center mr-2 '>Expected Quantity</label>
                                    <InputNumber
                                        id="expectedQuantity"
                                        name="expectedQuantity"
                                        onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        onValueChange={(e) => {
                                            formik.setFieldValue('expectedQuantity', e.value);
                                        }}
                                        value={formik.values.expectedQuantity}
                                        className={expectedQuantityRequired ? 'p-invalid' : ''}
                                    />
                                    {expectedQuantityRequired && <small className='text-red-500 font-bold'>
                                        expectedQuantity is required
                                    </small>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[195px]'>
                        <Button
                            type="button"
                            label="+ Add Food"
                            onClick={() => {
                                if (selectedFood == null && formik.values.expectedQuantity == 0) {
                                    setFoodidRequired(true);
                                    setexpectedQuantityRequired(true);
                                }
                                else if (selectedFood == null) {
                                    setFoodidRequired(true);
                                } else if (formik.values.expectedQuantity == 0) {
                                    setexpectedQuantityRequired(true);
                                } else {
                                    setFood({ foodId: selectedFood, expectedQuantity: formik.values.expectedQuantity });
                                    handleAddRow()
                                    setSelectedFood(null);
                                    setFoodidRequired(false);
                                    setexpectedQuantityRequired(false);
                                    formik.resetForm();
                                }
                            }}
                        />
                    </div>
                    <div className="p-field p-d-flex p-jc-space-between p-mt-4">

                        <Button
                            type="submit"
                            label="Create Food"
                            icon="pi pi-check"
                            className="p-button-success mt-6 w-[25%]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedingSchedulesCreate;
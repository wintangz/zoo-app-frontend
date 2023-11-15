import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createFood } from '~/api/foodService';

const FoodsCreate = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState(false);
    const toast = useRef(null);

    const initialValues = {
        name: '',
        type: '',
        quantity: '',
        status: true,
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        type: yup.string().required('Type is required'),
        quantity: yup
            .number()
            .integer('Quantity must be an integer')
            .typeError('Quantity must be a number')
            .required('Quantity is required'),
    });

    const labels = {
        title: 'Foods Management',
        subtitle: 'Table of Foods',
        apiPath: '/foods'
    }
    // const { data, mutate, isLoading } = useSWR(labels.apiPath, post);
    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                values.quantity = parseInt(values.quantity);
                const response = await createFood({ ...values });
                if (response.status === 200) {
                    setFoods(true);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create food successfully', life: 3000 })
                    resetForm();
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                }
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    // const handleClose = () => {
    //     setFoods(false);
    //     navigate('/dashboard/foods');
    // };

    return (
        <div className="p-5">
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
            <div className="p-m-5">
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="flex flex-col mt-5">
                        <label className="font-bold block mb-2">Name</label>
                        <InputText
                            id="name"
                            name="name"
                            style={{ width: "500px" }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.name}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col mt-5">
                        <label className="font-bold block mb-2" htmlFor="type">Type</label>
                        <InputText
                            id="type"
                            name="type"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.type}
                            className={formik.errors.type && formik.touched.type ? 'p-invalid' : ''}
                        />
                        {formik.errors.type && formik.touched.type && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.type}
                            </small>
                        )}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="font-bold block mb-2" htmlFor="quantity">Quantity</label>
                        <InputText
                            id="quantity"
                            name="quantity"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.quantity}
                            className={formik.errors.quantity && formik.touched.quantity ? 'p-invalid' : ''}
                        />
                        {formik.errors.quantity && formik.touched.quantity && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.quantity}
                            </small>
                        )}
                    </div>

                    <div className='flex justify-between mt-12'>
                        <Button
                            type="button"
                            label="Back"
                            severity="info"
                            icon="pi pi-eye"
                            raised
                            className='w-28 h-14'
                            onClick={() => navigate('/dashboard/foods')}
                        />
                        <Button
                            type="submit"
                            label="Create"
                            icon="pi pi-check"
                            severity="success"
                            className='w-32 h-14'
                            raised
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodsCreate;

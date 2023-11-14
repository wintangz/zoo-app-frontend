import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getFoodById, updateFoods } from '~/api/foodService';

const FoodsUpdate = () => {
    const { foodId } = useParams();
    const navigate = useNavigate();
    const [foods, setFoods] = useState(false);
    const toast = useRef(null);

    const fetchapi = async (id) => {
        const result = await getFoodById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(foodId);
        res.then((result) => {
            setFoods(result);
            formik.setValues({
                name: result?.name || '',
                type: result?.type || '',
                quantity: result?.quantity || '',
                status: result?.status ? 'True' : 'False',
            });
        });
    }, [foodId]);

    const initialValues = {
        name: foods?.name || '',
        type: foods?.type || '',
        quantity: foods?.quantity || '',
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
        onSubmit: async (values) => {
            try {
                values.quantity = parseInt(values.quantity);
                const response = await updateFoods(foodId, { ...values });
                console.log(response);
                if (response.status === 200) {
                    setDialogVisible(true);
                    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create food successfully', life: 3000 })
                    // } else {
                    // toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                }
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    const [isDialogVisible, setDialogVisible] = useState(false);

    const handleClose = () => {
        setDialogVisible(false);
        navigate('/dashboard/foods');
    };

    return (
        <div className="p-5">
            {/* <Toast ref={toast} /> */}
            <Dialog
                header="Update Food Successfully!"
                visible={isDialogVisible}
                style={{ width: '400px' }}
                onHide={handleClose}
            >
                <p>New food has been updated to the Database!</p>
                <Button
                    label="Close"
                    icon="pi pi-times"
                    onClick={handleClose}
                />
            </Dialog>

            <div className="p-m-5">
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText
                            id="name"
                            name="name"
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

                    <div className="p-field">
                        <label htmlFor="type">Type</label>
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
                    <div className="p-field">
                        <label htmlFor="quantity">Quantity</label>
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

                    <div className="p-field p-d-flex p-jc-space-between p-mt-4">
                        <Link to="/dashboard/foods">
                            <Button
                                type="button"
                                label="View Foods"
                                icon="pi pi-eye"
                            />
                        </Link>
                        <Button
                            type="submit"
                            label="Update Food"
                            icon="pi pi-check"
                            className="p-button-success"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodsUpdate;

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import { Formik } from 'formik';
import moment from 'moment/moment';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createCustomer } from '~/api/userService';

function CustomersCreate() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [formKey, setFormKey] = useState(0);

    const labels = {
        title: 'Create Customer',
        subtitle: 'Create new Customer',
        apiPath: '/customer/create'
    }

    const handleFormSubmit = async (values) => {
        try {
            console.log(values);
            if (values.sex === 'male') {
                values.sex = true;
            } else if (values.sex === 'female') {
                values.sex = false;
            }

            const response = await createCustomer(values);
            console.log(response);
            if (response) {
                const status = response.status;
                if (status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create Customer Successfully', life: 3000 })
                    setFormKey((prevKey) => prevKey + 1);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + response.status, detail: response.data.error, life: 3000 });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const initialValues = {
        username: '',
        password: '',
        lastname: '',
        firstname: '',
        sex: 'male',
        dateOfBirth: null,
        address: '',
        nationality: '',
        phone: '',
        email: '',
        status: true,
    };

    const userSchema = yup.object().shape({
        username: yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters'),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        lastname: yup.string().required('Last Name is required'),
        firstname: yup.string().required('First Name is required'),
        sex: yup.string().required('required'),
        dateOfBirth: yup.date()
            .required('Birth Date is required')
            .max(new Date(), 'Date of Birth cannot be in the future'),
        address: yup.string().required('Address is required'),
        nationality: yup.string().required('Country is required'),
        phone: yup.string()
            .required('Phone Number is required')
            .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number format'),
        email: yup.string().email('Invalid email address').required('Email is required'),
    });

    return (
        <>
            <Toast ref={toast} />
            <div className='p-5'>
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <Formik key={formKey} // Add key to trigger re-render
                    onSubmit={(values, { setValues }) => {
                        // Trim all values before submitting
                        const trimmedValues = Object.entries(values).reduce((acc, [key, value]) => {
                            acc[key] = typeof value === 'string' ? value.trim() : value;
                            return acc;
                        }, {});

                        handleFormSubmit(trimmedValues);
                        // Optionally, update the form state with trimmed values
                        setValues(trimmedValues);
                    }}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Username</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        name="username"
                                        style={{ width: '550px' }}
                                        className={`${errors.username && touched.username ? 'p-invalid' : ''}`}
                                    />
                                    {errors.username && touched.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">Password</label>
                                    <InputText
                                        type="password"
                                        toggleMask
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        style={{ width: '550px' }}
                                        className={`${errors.password && touched.password ? 'p-invalid' : ''}`}
                                    />
                                    {errors.password && touched.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Last Name</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastname}
                                        name="lastname"
                                        style={{ width: '550px' }}
                                        className={`${errors.lastname && touched.lastname ? 'p-invalid' : ''}`}
                                    />
                                    {errors.lastname && touched.lastname && <div style={{ color: 'red' }}>{errors.lastname}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">First Name</label>
                                    <InputText
                                        type="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstname}
                                        name="firstname"
                                        style={{ width: '550px' }}
                                        className={`${errors.firstname && touched.firstname ? 'p-invalid' : ''}`}
                                    />
                                    {errors.firstname && touched.firstname && <div style={{ color: 'red' }}>{errors.firstname}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Email</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        style={{ width: '550px' }}
                                        className={`${errors.email && touched.email ? 'p-invalid' : ''}`}
                                    />
                                    {errors.email && touched.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">Address</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        name="address"
                                        style={{ width: '550px' }}
                                        className={`${errors.address && touched.address ? 'p-invalid' : ''}`}
                                    />
                                    {errors.address && touched.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Phone Number</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}
                                        name="phone"
                                        style={{ width: '550px' }}
                                        className={`${errors.phone && touched.phone ? 'p-invalid' : ''}`}
                                    />
                                    {errors.phone && touched.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">Nationality</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.nationality}
                                        name="nationality"
                                        style={{ width: '550px' }}
                                        className={`${errors.nationality && touched.nationality ? 'p-invalid' : ''}`}
                                    />
                                    {errors.nationality && touched.nationality && <div style={{ color: 'red' }}>{errors.nationality}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="p-field">
                                    <label className="font-bold block mb-2">Date of Birth</label>
                                    <Calendar
                                        value={values.dateOfBirth}
                                        onChange={(e) => setFieldValue('dateOfBirth', e.value)}
                                        inputId="dateOfBirth"
                                        showTime
                                        hourFormat="24"
                                        showIcon
                                        style={{ width: '550px' }}
                                        className={`${errors.dateOfBirth && touched.dateOfBirth ? 'p-invalid' : ''}`}
                                    />
                                    {errors.dateOfBirth && touched.dateOfBirth && <div style={{ color: 'red' }}>{errors.dateOfBirth}</div>}
                                </div>
                                <div>
                                    <label className="font-bold block ">Gender</label>
                                    <div className='flex flex-wrap gap-5 mt-2'>
                                        <div className="flex align-items-center">
                                            <RadioButton
                                                inputId="male"
                                                name="sex"
                                                onBlur={handleBlur}
                                                onChange={() => setFieldValue('sex', 'male')}
                                                checked={values.sex === 'male'}
                                            />
                                            <label htmlFor="male" className="ml-2">Male</label>
                                        </div>
                                        <div className="flex items-center">
                                            <RadioButton
                                                inputId="female"
                                                name="sex"
                                                onBlur={handleBlur}
                                                onChange={() => setFieldValue('sex', 'female')}
                                                checked={values.sex === 'female'}
                                            />
                                            <label htmlFor="female" className="ml-2">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-12'>
                                <Button
                                    type="button"
                                    label="Back"
                                    severity="info"
                                    icon="pi pi-eye"
                                    raised
                                    className='w-28 h-14'
                                    onClick={() => navigate('/dashboard/customers')}
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
                    )}
                </Formik>
            </div >
        </>
    );
}

export default CustomersCreate;

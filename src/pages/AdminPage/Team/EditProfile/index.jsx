

import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as mockData from '~/api/userService';
import { updateUser } from '~/api/userService';
import { decode } from '~/utils/axiosClient';

function EditProfile() {
    //--------------- Call API GET USER ---------------------------------//
    const [users, setUsers] = useState({});
    const navigate = useNavigate();
    const toast = useRef(null);
    const fetchapi = async (id) => {
        const result = await mockData.getUserById(id);
        return result;
    };

    const newObj = decode(localStorage.getItem('token'));

    useEffect(() => {
        const res = fetchapi(newObj.sub);
        res.then((result) => {
            setUsers(result);
        });
    }, []);

    const labels = {
        title: 'Edit Profile',
        subtitle: 'Edit your Profile',
        // apiPath: '/customer/update',
    };

    const handleFormSubmit = async (values) => {
        try {
            if (values.sex === 'male') {
                values.sex = true;
            } else if (values.sex === 'female') {
                values.sex = false;
            }
            const res = updateUser(newObj.sub, values);
            res.then((result) => {
                const status = result.status;
                if (status === 200) {
                    handleCloseClick();
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    //********************************** INITIAL VALUE*********************************** */
    const initialValues = {
        username: users?.username || '',
        lastname: users?.lastname || '',
        firstname: users?.firstname || '',
        sex: users?.sex ? 'male' : 'female',
        dateOfBirth: new Date(users.dateOfBirth),
        address: users?.address || '',
        nationality: users?.nationality || '',
        phone: users?.phone || '',
        email: users?.email || '',
        status: true,
    };

    //****************************** VALIDATION ********************************
    const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
    const userSchema = yup.object().shape({
        lastname: yup.string().required('required'),
        firstname: yup.string().required('required'),
        sex: yup.string().required('required'),
        dateOfBirth: yup.date().required('required'),
        address: yup.string().required('required'),
        nationality: yup.string().required('required'),
        phone: yup.string().matches(phoneRegExp, 'Phone numbers is not valid').required('required'),
        email: yup.string().email('Invalid email').required('required'),
    });

    const [close, setClose] = useState(false);
    const closeFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => navigate('/dashboard')} />
        </React.Fragment>
    );
    const handleCloseClick = () => {
        setClose(true)
    }

    return (
        <>
            <Toast ref={toast} />
            <Dialog visible={close} style={{ width: '20rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                // header="Update Successfully"
                onHide={() => setClose(false)}
                footer={closeFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-check-circle mr-3 text-3xl text-green-400" />
                    <span className='font-bold text-green-400 text-xl'>
                        Update Successfully
                    </span>
                </div>
            </Dialog>
            <div className='p-5'>
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <Formik // Add key to trigger re-render
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
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
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
                                    onClick={() => navigate('/dashboard/users')}
                                />
                                <Button
                                    type="submit"
                                    label="Update"
                                    icon="pi pi-check"
                                    severity="warning"
                                    className='w-32 h-14'
                                    raised
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default EditProfile;

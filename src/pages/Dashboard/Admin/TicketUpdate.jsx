
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';

import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import { updateTicket } from '~/api/ticketService';
import uploadFile from '~/utils/transferFile';
import { useNavigate, useLocation } from 'react-router-dom';

function TicketUpdate() {
    const location = useLocation()
    const navigate = useNavigate();
    const toast = useRef(null);
    const [formKey, setFormKey] = useState(0);
    const [ticket, setTicket] = useState({});
    const ticketType = ['Children', 'Adult', 'Elder'];

    useEffect(() => {
        console.log(location.state);
        setTicket(location.state);
    }, [location.state]);

    const labels = {
        title: 'Update Ticket Type',
        subtitle: 'Update Ticket Type',
        apiPath: 'tickets'
    }

    const initialValues = {
        name: ticket.name,
        price: ticket.price,
        type: ticket.type,
        description: ticket.description,
        imgUrl: ticket?.imgUrl || '',
        status: ticket?.status ? 'True' : 'False',
    };

    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    const userSchema = yup.object().shape({
        name: yup.string().required('required'),
        price: yup.number().required('Price is required'),
        type: yup.string().required('required'),
        description: yup.string().required('required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
    });

    const handleFormSubmit = async (values) => {
        try {
            const imgURL = await uploadFile(values.imgUrl, 'tickets'); // Wait for the file upload to complete
            values.imgUrl = imgURL;
            console.log(values);
            const res = await updateTicket(ticket.id, values);
            if (res.status === 200) {
                console.log(values);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Ticket Type Successfully', life: 3000 })
                setFormKey((prevKey) => prevKey + 1);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error ' + res.status, detail: res.data.error, life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(location.state)
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
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row space-x-10 mt-5">
                                {/* //name */}
                                <div >
                                    <label className="font-bold block mb-2">Name</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        style={{ width: '550px' }}
                                        className={`${errors.name && touched.name ? 'p-invalid' : ''}`}
                                    />
                                    {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                                </div>

                                {/* Price */}
                                <div className="">
                                    <label className="font-bold block mb-2">Price</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.price}
                                        name="price"
                                        style={{ width: '550px' }}
                                        className={`${errors.price && touched.price ? 'p-invalid' : ''}`}
                                    />
                                    {errors.price && touched.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                {/* //type */}
                                <div>
                                    <label className="font-bold block mb-2">Type</label>
                                    <Dropdown
                                        style={{ width: '550px' }}
                                        options={ticketType}
                                        onChange={(e) => setFieldValue('type', e.value)}
                                        value={values.type}
                                        defaultValue="Children"
                                        className={`${errors.type && touched.type ? 'p-invalid' : ''}`}
                                    />
                                    {errors.type && touched.type && <div style={{ color: 'red' }}>{errors.type}</div>}
                                </div>

                                {/* description */}
                                <div className="">
                                    <label className="font-bold block mb-2">Description</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        name="description"
                                        style={{ width: '550px' }}
                                        className={`${errors.description && touched.description ? 'p-invalid' : ''}`}
                                    />
                                    {errors.description && touched.description && <div style={{ color: 'red' }}>{errors.description}</div>}
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label className="font-bold block">Image Url</label>
                                <input
                                    className='m-0 w-96'
                                    type="file"
                                    label="imgUrl"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        setFieldValue('imgUrl', e.currentTarget.files[0]);
                                    }}
                                    name="imgUrl"
                                    error={!!touched.imgUrl && !!errors.imgUrl}
                                />
                                {touched.imgUrl && errors.imgUrl && (
                                    <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                )}
                                <img src={values.imgUrl} className='w-40 h-20 ' />
                            </div>
                            <div>
                                <div className="mt-5">
                                    <label className="font-bold block ">Status</label>
                                    <div className='flex flex-wrap gap-5 mt-2'>
                                        <div className="flex align-items-center">
                                            <RadioButton
                                                inputId="statusTrue"
                                                name="status"
                                                value="True"
                                                onChange={handleChange}
                                                checked={values.status === 'True'}
                                            />
                                            <label htmlFor="StatusTrue" className="ml-2">True</label>
                                        </div>
                                        <div className="flex items-center">
                                            <RadioButton
                                                inputId="statusFalse"
                                                name="status"
                                                value="False"
                                                onChange={handleChange}
                                                checked={values.status === 'False'}
                                            />
                                            <label htmlFor="StatusTrue" className="ml-2">False</label>
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
                                    onClick={() => navigate('/dashboard/tickets')}
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
            </div>
        </>
    );
}

export default TicketUpdate;

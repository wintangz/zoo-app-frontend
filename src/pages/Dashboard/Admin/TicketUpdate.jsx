
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import { updateTicket } from '~/api/ticketService';
import uploadFile from '~/utils/transferFile';
import { useNavigate, useLocation } from 'react-router-dom';

function TicketUpdate() {
    const location = useLocation()
    const navigate = useNavigate();
    const toast = useRef(null);
    // const [formKey, setFormKey] = useState(0);
    const [ticket, setTicket] = useState({});
    const ticketType = ['Children', 'Adult', 'Elder'];

    useEffect(() => {
        console.log(location.state);
        setTicket(location.state);
    }, [location.state]);

    const labels = {
        title: 'Ticket Management',
        subtitle: 'Update Ticket',
        // apiPath: 'tickets'
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
        imgUrl: yup.mixed()
            .notRequired()
            .nullable()
            .test('is-file', 'Invalid file', function (value) {
                if (typeof value === 'string') {
                    return true;
                }
                if (value === null || value === undefined) {
                    return true;
                }
                if (value instanceof File) {
                    return value.size <= FILE_SIZE && SUPPORTED_FORMATS.includes(value.type);
                }
                return false;
            }),
    });

    const handleFormSubmit = async (values) => {
        try {
            if (values.imgUrl instanceof File) {
                const imgURL = await uploadFile(values.imgUrl, 'update-news');
                values.imgUrl = imgURL;
            }
            console.log(values);
            const res = await updateTicket(ticket.id, values);
            if (res.status === 200) {
                // console.log(values);
                handleCloseClick();
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Ticket Type Successfully', life: 3000 })
                // setFormKey((prevKey) => prevKey + 1);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error ' + res.status, detail: res.data.error, life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const [close, setClose] = useState(false);
    const closeFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => navigate('/dashboard/tickets')} />
        </React.Fragment>
    );
    const handleCloseClick = () => {
        setClose(true)
    }

    // console.log(location.state)
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
                <Formik
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
                                <div>
                                    <label className="font-bold block mb-2">Image Url</label>
                                    <div className="relative">
                                        <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                setFieldValue('imgUrl', e.currentTarget.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            name="imgUrl"
                                            id="imgUrlInput"
                                        />
                                        <label
                                            htmlFor="imgUrlInput"
                                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                        >
                                            Upload
                                        </label>
                                        <span className={`ml-2 ${values.imgUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                            {values.imgUrl ? 'File Uploaded' : 'No File chosen'}
                                        </span>
                                    </div>
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                    <img src={values.imgUrl} className='w-96 h-44 mt-3 rounded-md' />
                                </div>
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

export default TicketUpdate;

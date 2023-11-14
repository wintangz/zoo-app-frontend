

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';

import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as mockData from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function HabitatsUpdate() {
    const { habitatId } = useParams();
    const toast = useRef(null);

    const [habitat, setHabitat] = useState({});
    const navigate = useNavigate();
    const location = useLocation()

    const fetchapi = async (id) => {
        const result = await mockData.getHabitatById(id);
        return result;
    };
    useEffect(() => {
        console.log(location.state);
        setHabitat(location.state);
    }, []);

    const labels = {
        title: 'Update Habitat',
        subtitle: 'Update a Habitat',
        apiPath: '/habitats/update'
    }


    const [close, setClose] = useState(false);
    const closeFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => navigate('/dashboard/habitats')} />
        </React.Fragment>
    );
    const handleCloseClick = () => {
        setClose(true)
    }
    const handleFormSubmit = async (values) => {
        try {
            if (values.imgUrl instanceof File) {
                const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
                values.imgUrl = imgURL;
            }
            if (values.bannerUrl instanceof File) {
                const bannerURL = await uploadFile(values.bannerUrl, 'update-habitats');
                values.bannerUrl = bannerURL;
            }
            const res = mockData.updateHabitats(location.state.id, values);
            console.log(res)
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Habitat Successfully', life: 3000 })
                    handleCloseClick();
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const initialValues = {
        name: habitat?.name || '',
        info: habitat?.info || '',
        imgUrl: habitat?.imgUrl || '',
        bannerUrl: habitat?.bannerUrl || '',
        status: habitat?.status ? 'True' : 'False',
    };


    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        info: yup.string().required('Information is required!'),
        imgUrl: yup.string().required('imgUrl is required!'),
        bannerUrl: yup.string().required('bannerUrl is required!'),
    });



    console.log(location.state)
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
                <Formik onSubmit={(values, { setValues }) => {
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

                            <div className="">
                                <label className="font-bold block mb-2 mt-5">Name</label>
                                <InputText
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    className={`w-96 ${errors.name && touched.name ? 'p-invalid' : ''}`}
                                />
                                {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                            </div>
                            <div className='mt-10'>
                                <label className="font-bold block mb-2" >Infomation</label>
                                <InputTextarea
                                    rows={5}
                                    cols={130}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.info}
                                    name="info"
                                    className={` ${errors.info && touched.info ? 'p-invalid' : ''}`}
                                />
                                {errors.info && touched.info && <div style={{ color: 'red' }}>{errors.info}</div>}
                            </div>
                            <div className="flex flex-row space-x-20 mt-5 gap-20">
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

                                <div>
                                    <label className="font-bold block mb-2">Banner Url</label>
                                    <div className="relative">
                                        <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                setFieldValue('bannerUrl', e.currentTarget.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            name="bannerUrl"
                                            id="bannerUrlInput"
                                        />
                                        <label
                                            htmlFor="bannerUrlInput"
                                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                        >
                                            Upload
                                        </label>
                                        <span className={`ml-2 ${values.bannerUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                            {values.bannerUrl ? 'File Uploaded' : 'No File chosen'}
                                        </span>
                                    </div>
                                    {touched.bannerUrl && errors.bannerUrl && (
                                        <div style={{ color: 'red' }}>{errors.bannerUrl}</div>
                                    )}
                                    <img src={values.bannerUrl} className='w-96 h-44 mt-3 rounded-md' />
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
                                    onClick={() => navigate('/dashboard/habitats')}
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

export default HabitatsUpdate;

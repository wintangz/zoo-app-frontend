import {
    FormControl,
    Input,
} from '@mui/material';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';

import { Formik, resetForm } from 'formik';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createHabitats } from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function HabitatsCreate() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [formKey, setFormKey] = useState(0);
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    const labels = {
        title: 'Create Habitat',
        subtitle: 'Create new Habitat',
        apiPath: '/habitats/create'
    }


    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
            values.imgUrl = imgURL;
            const bannerURL = await uploadFile(values.bannerUrl, 'update-habitats');
            values.bannerUrl = bannerURL;
            const res = createHabitats(values);
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Create Habitat Successfully',
                        life: 3000,
                    });
                    setFormKey((prevKey) => prevKey + 1);
                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error ' + result.status,
                        detail: result.data.error,
                        life: 3000,
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const initialValues = {
        name: '',
        info: '',
        // imgUrl: '',
        // bannerUrl: '',
        status: "True",
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        info: yup.string().required('Information is required!'),
        // imgUrl: yup
        //     .mixed()
        //     .notRequired()
        //     .nullable()
        //     .test('is-file', 'Invalid file', function (value) {
        //         if (typeof value === 'string') {
        //             return true;
        //         }
        //         if (value === null || value === undefined) {
        //             return true;
        //         }
        //         if (value instanceof File) {
        //             return value.size <= FILE_SIZE && SUPPORTED_FORMATS.includes(value.type);
        //         }
        //         return false;
        //     }),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        // bannerUrl: yup
        //     .mixed()
        //     .notRequired()
        //     .nullable()
        //     .test('is-file', 'Invalid file', function (value) {
        //         if (typeof value === 'string') {
        //             return true;
        //         }
        //         if (value === null || value === undefined) {
        //             return true;
        //         }
        //         if (value instanceof File) {
        //             return value.size <= FILE_SIZE && SUPPORTED_FORMATS.includes(value.type);
        //         }
        //         return false;
        //     }),
        bannerUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),

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
                                    label="View Habitats"
                                    severity="info"
                                    raised
                                    onClick={() => navigate('/dashboard/habitats')}
                                />

                                <Button
                                    type="submit"
                                    label="Create Habitat"
                                    severity="success"
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

export default HabitatsCreate;

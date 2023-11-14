import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createNews } from '~/api/newsService';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
import CustomToolbar from '~/component/Layout/components/QuillEditor/CustomToolbar';

function NewsCreate() {
    const toast = useRef(null);
    const [formKey, setFormKey] = useState(0);
    const navigate = useNavigate();

    const labels = {
        title: 'Create News',
        subtitle: 'Create new News',
        apiPath: '/news/create'
    }

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const initialValues = {
        title: '',
        shortDescription: '',
        content: '',
        type: 'Event',
        imgUrl: '',
        thumbnailUrl: '',
        status: "True",
        content: "",
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const typeOptions = ['Event', 'Info'];
    const userSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        shortDescription: yup.string().required('Short Description is required').max(250, "Short Description max is 250 words."),
        content: yup.string().required('Content is required'),
        type: yup.string().required('Type is required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        thumbnailUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type))
    });

    const handleFormSubmit = async (values) => {
        try {
            console.log(values);
            values.imgUrl = await uploadFile(values.imgUrl, 'create-news');
            values.thumbnailUrl = await uploadFile(values.thumbnailUrl, 'create-news');
            const response = await createNews(values);
            if (response.data.status === "Ok") {
                console.log(values);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create News Successfully', life: 3000 })
                setFormKey((prevKey) => prevKey + 1);
            } else if (response.status !== 200) {
                toast.current.show({ severity: 'error', summary: 'Error ' + response.status, detail: response.data.error, life: 3000 });
            }

        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };

    const formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'script',
        'header',
        'blockquote',
        'code-block',
        'indent',
        'list',
        'direction',
        'align',
        'link',
        'image',
        'video',
        'formula',
    ];
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
                    {({ values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched }) => (
                        <form onSubmit={handleSubmit} >
                            <div className="flex flex-col gap-2 mt-5">
                                <label className="font-bold block">Title</label>
                                <InputText
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    className={`w-full ${errors.title && touched.title ? 'p-invalid' : ''}`}
                                />
                                {errors.title && touched.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                            </div>
                            <div className="flex flex-col gap-2 mt-5">
                                <label className="font-bold block">Short Description</label>
                                <InputText
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.shortDescription}
                                    name="shortDescription"
                                    className={`w-full ${errors.shortDescription && touched.shortDescription ? 'p-invalid' : ''}`}
                                />
                                {errors.shortDescription && touched.shortDescription && <div style={{ color: 'red' }}>{errors.shortDescription}</div>}
                            </div>
                            <div className='flex flex-col gap-2 mt-5'>
                                <label className="font-bold block" >Type</label>
                                <div className=''>
                                    <CustomToolbar />
                                    <ReactQuill
                                        theme="snow"
                                        value={values.content}
                                        onChange={(e) => {
                                            setFieldValue('content', e);
                                        }}
                                        modules={modules}
                                        formats={formats}
                                        style={{ height: '25vh' }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-5">
                                <label className="font-bold block" >Type</label>
                                <Dropdown
                                    style={{ width: '340px' }}
                                    // defaultValue={habitatId}
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type} // Assuming habitattId is the selected value
                                    options={typeOptions.map((type) => ({ label: type, value: type }))}
                                    placeholder="Select a Type"
                                />
                            </div>
                            <div className="flex flex-row gap-28 mt-5">
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
                                    <label className="font-bold block mb-2">Thumbnail Url</label>
                                    <div className="relative">
                                        <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                setFieldValue('thumbnailUrl', e.currentTarget.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            name="thumbnailUrl"
                                            id="thumbnailUrlInput"
                                        />
                                        <label
                                            htmlFor="thumbnailUrlInput"
                                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                        >
                                            Upload
                                        </label>
                                        <span className={`ml-2 ${values.thumbnailUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                            {values.thumbnailUrl ? 'File Uploaded' : 'No File chosen'}
                                        </span>
                                    </div>
                                    {touched.thumbnailUrl && errors.thumbnailUrl && (
                                        <div style={{ color: 'red' }}>{errors.thumbnailUrl}</div>
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
                                            <label htmlFor="statusFalse" className="ml-2">False</label>
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
                                    onClick={() => navigate('/dashboard/news')}
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

export default NewsCreate;
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState, useRef } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getNewsById, updateNews } from '~/api/newsService';
import CustomToolbar from '~/component/Layout/components/QuillEditor/CustomToolbar';
import uploadFile from '~/utils/transferFile';

const NewsUpdate = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState({});
    const toast = useRef(null);
    const navigate = useNavigate();

    const fetchapi = async (id) => {
        const result = await getNewsById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(newsId);
        res.then((result) => {
            setNews(result);
            setEditorContent(result.content || '');

        });
    }, []);

    const labels = {
        title: 'Update News',
        subtitle: 'Update a News',
        // apiPath: '/news/update'
    }

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const initialValues = {
        title: news?.title || '',
        shortDescription: news?.shortDescription || '',
        content: '',
        type: news?.type || '',
        imgUrl: news?.imgUrl || '',
        thumbnailUrl: news?.thumbnailUrl || '',
        status: news?.status ? 'True' : 'False'
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const typeOptions = ['Event', 'Info'];
    const userSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        shortDescription: yup.string().required('Short Description is required').max(250, "Short Description max is 250 words."),
        // content: yup.string().required('Content is required'),
        imgUrl: yup
            .mixed()
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
        thumbnailUrl: yup
            .mixed()
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
            const submitValue = { ...values, content: editorContent };
            if (values.imgUrl instanceof File) {
                const imgURL = await uploadFile(submitValue.imgUrl, 'update-news');
                submitValue.imgUrl = imgURL;
            }
            if (values.thumbnailUrl instanceof File) {
                const thumbnailURL = await uploadFile(submitValue.thumbnailUrl, 'update-news');
                submitValue.thumbnailUrl = thumbnailURL;
            }
            const response = updateNews(newsId, submitValue);
            console.log(submitValue);
            response.then((result) => {
                const status = result.status;
                if (status === 200) {
                    handleCloseClick();
                    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update News Successfully', life: 3000 })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
                }
            });
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

    const [close, setClose] = useState(false);
    const closeFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => navigate('/dashboard/news')} />
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
                            <div className="flex flex-column gap-2">
                                <label className="font-bold block">Title</label>
                                <InputText
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    defaultValue=" "
                                    value={values.title}
                                    name="title"
                                    className={`w-full ${errors.title && touched.title ? 'p-invalid' : ''}`}
                                />
                                {errors.title && touched.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                            </div>

                            <div className='flex flex-column gap-2 mt-5'>
                                <label className="font-bold block">Short Description</label>
                                <InputText
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="ShortDescription"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    defaultValue=" "
                                    value={values.shortDescription}
                                    name="shortDescription"
                                    className={`w-full ${errors.shortDescription && touched.shortDescription ? 'p-invalid' : ''}`}
                                />
                                {errors.shortDescription && touched.shortDescription && <div style={{ color: 'red' }}>{errors.shortDescription}</div>}
                            </div>
                            <div className='flex flex-column gap-2 mt-5'>
                                <label className="font-bold block" >Content</label>
                                <div border="1px solid #ced4da" borderRadius="4px">
                                    <CustomToolbar />
                                    <ReactQuill
                                        theme="snow"
                                        value={editorContent}
                                        onChange={handleEditorChange}
                                        modules={modules}
                                        formats={formats}
                                        style={{ height: '25vh' }}
                                        error={!!touched.content && !!errors.content}
                                        helperText={touched.content && errors.content}
                                    />
                                </div>
                                {touched.content && errors.content && (
                                    <div style={{ color: 'red', marginTop: '0.5rem' }}>{errors.content}</div>
                                )}
                            </div>
                            <div className='flex flex-column gap-2 mt-5' fullWidth variant="filled">
                                <label className="font-bold block" >Type</label>
                                <Dropdown
                                    id="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    label="Type"
                                    name="type"
                                    options={typeOptions}
                                />
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
                                    <img src={values.thumbnailUrl} className='w-96 h-44 mt-3 rounded-md' />
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
                                    onClick={() => navigate('/dashboard/news')}
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

export default NewsUpdate
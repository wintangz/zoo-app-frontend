import { FormControl, Input } from '@mui/material';


import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';

import { Formik } from 'formik';
import { useEffect, useState, useRef } from 'react';
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
        apiPath: '/news/update'
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
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update News Successfully', life: 3000 })
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
    return (
        <>
            <Toast ref={toast} />
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
                            <div className="flex flex-row gap-28 mt-5">
                                <div className="flex flex-col">
                                    <FormControl className="" component="fieldset" >
                                        <label className="font-bold block" >Image Url</label>
                                        <Input
                                            className='m-0'
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
                                        <img src={values.imgUrl} className='w-40 h-20' />
                                    </FormControl>
                                </div>
                                <div className="flex flex-col">
                                    <FormControl className="" component="fieldset" >
                                        <label className="font-bold block" >Image Url</label>
                                        <Input
                                            className='m-0'
                                            type="file"
                                            label="thumbnailUrl"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue('thumbnailUrl', e.currentTarget.files[0]);
                                            }}
                                            name="thumbnailUrl"
                                            error={!!touched.thumbnailUrl && !!errors.thumbnailUrl}
                                        />
                                        {touched.thumbnailUrl && errors.thumbnailUrl && (
                                            <div style={{ color: 'red' }}>{errors.thumbnailUrl}</div>
                                        )}
                                        <img src={values.thumbnailUrl} className='w-40 h-20' />
                                    </FormControl>
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
import { Box, Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getNewsById, updateNews } from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import CustomToolbar from '~/pages/AdminPage/New/QuillEditor/CustomToolbar';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

const NewsUpdate = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState({});
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
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.grey[500],
        border: '2px solid #000',
        color: colors.grey[100],
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
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
                if (result.data.status === "Ok") {
                    setOpen(true);
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        navigate('/home/news');
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
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Update News Successfully!</h2>
                        <p id="parent-modal-description">New News have been update to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update News" subtitle="Update news content" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema} enableReinitialize={true}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box className='space-y-8'>
                                <div className="flex flex-column gap-2">
                                    <label>Title</label>
                                    <InputText
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.title}
                                        name="title"
                                        error={!!touched.title && !!errors.title}
                                        helperText={touched.title && errors.title}
                                    />
                                </div>

                                <div className='flex flex-column gap-2'>
                                    <label>Description</label>
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
                                        error={!!touched.shortDescription && !!errors.shortDescription}
                                        helperText={touched.shortDescription && errors.shortDescription}
                                    />
                                </div>
                                <div className='flex flex-column gap-2'>
                                    <label>Content</label>
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
                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="type-label">Type</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        id="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Type"
                                        name="type"
                                    >
                                        {typeOptions.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl component="fieldset" >
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        imgUrl
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="imgUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }}
                                        name="imgUrl"
                                    />
                                </FormControl>
                                <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />

                                <FormControl component="fieldset" sx={{ paddingLeft: "10px" }}>
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px", paddingLeft: "10px" }}>
                                        thumbnailUrls
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="thumbnailUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('thumbnailUrl', e.currentTarget.files[0]);
                                        }}
                                        name="thumbnailUrl"
                                    />
                                </FormControl>
                                <img src={values.thumbnailUrl} alt='' style={{ width: "150px", height: "70px" }} />
                                <FormControl
                                    component="fieldset"
                                    width="75%"
                                    sx={{
                                        gridColumn: 'span 1', paddingLeft: "10px"
                                    }}
                                    label="Status"
                                >
                                    <Typography variant="h6" color={colors.grey[300]} style={{ margin: '0.8vw' }}>
                                        Status
                                    </Typography>
                                    <RadioGroup
                                        aria-label="Status"
                                        name="status"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.status}
                                        sx={{ display: 'inline-block' }}
                                        label="Status"
                                    >
                                        <FormControlLabel
                                            value="True"
                                            control={
                                                <Radio
                                                    sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                />
                                            }
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="False"
                                            control={
                                                <Radio
                                                    sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                />
                                            }
                                            label="False"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/news')}
                                >
                                    VIEW NEWS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    UPDATE NEWS
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default NewsUpdate
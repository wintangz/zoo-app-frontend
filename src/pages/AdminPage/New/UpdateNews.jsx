import { Box, Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getNewsById, updateNews } from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
import CustomToolbar from './QuillEditor/CustomToolbar';

function UpdateNews() {
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
            setNews((values) => ({
                ...values,
                title: result?.title || '',
                shortDescription: result?.shortDescription || '',
                type: result?.type || '',
                imgUrl: result?.imgUrl || '',
                thumbnailUrl: result?.thumbnailUrl || '',
                status: result?.status ? 'True' : 'False',
            }));
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
        status: news?.status ? 'True' : 'False',
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const typeOptions = ['Event', 'Info'];
    const userSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        shortDescription: yup.string().required('Short Description is required'),
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
            const submitValue = { ...values, content: editorContent };
            const imgURL = await uploadFile(submitValue.imgUrl, 'update-news');
            const thumbnailUrl = await uploadFile(submitValue.thumbnailUrl, 'update-news');
            submitValue.imgUrl = imgURL;
            submitValue.thumbnailUrl = thumbnailUrl;
            const response = await updateNews(newsId, submitValue);
            console.log(submitValue);
            if (response?.status === 200) {
                setOpen(true);
            }
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
                        <h2 id="parent-modal-title">"Update News Successfully!"</h2>
                        <p id="parent-modal-description">New news have been update to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update News" subtitle="Update news content" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema} enableReinitialize={true}>
                    {({ values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    defaultValue=" "
                                    value={values.title}
                                    name="title"
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="ShortDescription"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    defaultValue=" "
                                    value={values.shortDescription}
                                    name="shortDescription"
                                />
                                <Box overflow="auto">
                                    <Typography variant="h6" color={colors.grey[300]} style={{ margin: '0.8vw' }}>
                                        Content
                                    </Typography>
                                    <Box border="1px solid #ced4da" borderRadius="4px">
                                        <CustomToolbar />
                                        <ReactQuill
                                            theme="snow"
                                            value={editorContent}
                                            onChange={handleEditorChange}
                                            modules={modules}
                                            formats={formats}
                                            style={{ height: '25vh' }}
                                        />
                                    </Box>
                                </Box>
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
                                    <Typography variant="body2" color="textSecondary">
                                        Image URL: {values.imgUrl}
                                    </Typography>
                                </FormControl>

                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        thumbnailUrl
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
                                    <Typography variant="body2" color="textSecondary">
                                        Image URL: {values.thumbnailUrl}
                                    </Typography>
                                </FormControl>
                                <FormControl
                                    component="fieldset"
                                    width="75%"
                                    sx={{
                                        gridColumn: 'span 1',
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
                                    VIEW All NEWS
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

export default UpdateNews;

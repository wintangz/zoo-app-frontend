import { Box, Button, TextField, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from 'yup';
import { createNews } from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import CustomToolbar from './QuillEditor/CustomToolbar';

function NewsPostForm() {
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
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const initialValues = {
        title: '',
        shortDescription: '',
        content: '',
        type: '',
        imgUrl: '',
        thumbnailUrl: '',
    };

    const userSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        shortDescription: yup.string().required('Short Description is required'),
        content: yup.string(),
        // .test('word-count', 'Content must have at least 10 words', (value) => {
        //     if (!value) return false; // Empty content is not allowed
        //     const wordCount = value.trim().split(/\s+/).length;
        //     return wordCount <= 10;
        // }),
        type: yup.string().required('Type is required'),
        imgUrl: yup.string().required('Image URL is required'),
        thumbnailUrl: yup.string().required('Thumbnail URL is required'),
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const submitValue = { ...values, content: editorContent };
            const response = await createNews(submitValue);
            console.log(submitValue);
            if (response?.status === 200) {
                setOpen(true);
                resetForm();
                setEditorContent('');
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
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
                        <h2 id="parent-modal-title">"Create News Successfully!"</h2>
                        <p id="parent-modal-description">New news have been add to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create News" subtitle="Create news content" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    value={values.shortDescription}
                                    name="shortDescription"
                                />
                                <Box mt={2} overflow="auto">
                                    <label htmlFor="content" style={{ marginLeft: '0.8vw' }}>
                                        Content
                                    </label>
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
                                    {errors.content && (
                                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{errors.content}</div>
                                    )}
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                    name="type"
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="ImgUrl"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.imgUrl}
                                    name="imgUrl"
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="ThumbnailUrl"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.thumbnailUrl}
                                    name="thumbnailUrl"
                                />
                            </Box>

                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE NEWS
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default NewsPostForm;

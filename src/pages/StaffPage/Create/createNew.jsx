import { Box, Button, TextField, useTheme as uTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';

function createNew() {
    const theme = uTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = uTheme(false);
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
    const handleFormSubmit = async (values, { resetForm }) => {};
    // const isNonMobile = useMediaQuery('(min-width: 600px)');

    const initialValues = {
        title: '',
        content: '',
        author: '',
        imgUrl: '',
        thumbnailUrl: '',
    };
    const userSchema = yup.object().shape({
        title: yup.string().required('required'),
        content: yup.string().required('required'),
        author: yup.string().required('required'),
        imgUrl: yup.string().required('required'),
        thumbnailUrl: yup.string().required('required'),
    });
    const handleClose = () => {
        setOpen(false);
    };
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
                        <h2 id="parent-modal-title">Create news successfully!</h2>
                        <p id="parent-modal-description">News have been add to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CREATE ZOO TRAINER" subtitle="Create a New Zoo Trainer Profile" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                sx={{
                                    '& > div': { gridColumn: 'span 4' },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Content"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.title}
                                    name="content"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
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

export default createNew;

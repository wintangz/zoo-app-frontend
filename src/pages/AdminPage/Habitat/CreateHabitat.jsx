import {
    Box,
    Button,
    TextField,
    useTheme
} from '@mui/material';

import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { createHabitats } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
// import { DataGridPro } from '@mui/x-data-grid-pro';
function CreateHabitat() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
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
    const isNonMobile = useMediaQuery('(min-width: 600px)');

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const response = await createHabitats(values);
            console.log(values);
            console.log(response);
            if (response.status === 200) {
                setOpen(true);
                resetForm();
            }
        } catch (error) {
            console.error(error);

        }
    };

    const initialValues = {
        name: '',
        info: '',
        imgUrl: '',
        bannerUrl: '',
        status: true,
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        info: yup.string().required('Information is required!'),
        imgUrl: yup.string().required('Image URL is required!'),
        bannerUrl: yup.string().required('Banner URL is required!'),

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
                        <h2 id="parent-modal-title">Create habitat successfully!</h2>
                        <p id="parent-modal-description">New habitat have been add to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CREATE HABITAT" subtitle="Create a new habitat" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    multiline
                                    rows={3}
                                    label="Infomation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.info}
                                    name="info"
                                    error={!!touched.info && !!errors.info}
                                    helperText={touched.info && errors.info}
                                    sx={{
                                        gridColumn: 'span 4',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Image URL"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.imgUrl}
                                    name="imgUrl"
                                    error={!!touched.imgUrl && !!errors.imgUrl}
                                    helperText={touched.imgUrl && errors.imgUrl}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Banner URL"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bannerUrl}
                                    name="bannerUrl"
                                    error={!!touched.bannerUrl && !!errors.bannerUrl}
                                    helperText={touched.bannerUrl && errors.bannerUrl}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE HABITAT
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateHabitat;

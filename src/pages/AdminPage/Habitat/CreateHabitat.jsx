import {
    Box,
    Button,
    FormControl,
    Input,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createHabitats } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
// import { DataGridPro } from '@mui/x-data-grid-pro';
function CreateHabitat() {
    const navigate = useNavigate();
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
            const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
            values.imgUrl = imgURL;
            const bannerURL = await uploadFile(values.bannerUrl, 'update-habitats');
            values.bannerUrl = bannerURL;
            const res = createHabitats(values);
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    setOpen(true);
                    resetForm();
                }
            });
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
        bannerUrl: yup
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
                        <h2 id="parent-modal-title">Create Habitat successfully!</h2>
                        <p id="parent-modal-description">New Habitat have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
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
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </FormControl>

                                <FormControl component="fieldset" >
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        bannerUrl
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="bannerUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('bannerUrl', e.currentTarget.files[0]);
                                        }}
                                        name="bannerUrl"
                                        error={!!touched.bannerUrl && !!errors.bannerUrl}
                                    />
                                    {touched.bannerUrl && errors.bannerUrl && (
                                        <div style={{ color: 'red' }}>{errors.bannerUrl}</div>
                                    )}
                                </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/habitats')}
                                >
                                    VIEW HABITATS
                                </Button>
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

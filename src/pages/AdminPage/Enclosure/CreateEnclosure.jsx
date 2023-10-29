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
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
// import uploadFile from '~/utils/transferFile';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { createEnclousures, getHabitats } from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';


function CreateEnclosure() {
    const navigate = useNavigate();
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [habitats, setHabitats] = useState([]);

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

    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            setHabitats(result);
        });
    }, []);

    const [habitattId, setHabitatId] = useState([])

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }

    const handleFormSubmit = async (values, { resetForm }) => {
        // values.createdDate = formattedDateTime(values.createdDate);
        try {
            const submitValue = {
                ...values,
                habitatId: habitattId,
            };
            const imgUrl = await uploadFile(submitValue.imgUrl, 'create-news');
            submitValue.imgUrl = imgUrl;
            console.log(submitValue);
            const response = await createEnclousures(submitValue);
            console.log(response);
            if (response.data.status === "Ok") {
                console.log(values);
                setOpen(true);
                resetForm();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const initialValues = {
        name: '',
        maxCapacity: '',
        info: '',
        imgUrl: '',
        habitatId: '',
        status: true,
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name cannot be empty'),
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
        info: yup.string().required('Information cannot be empty'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        habitatId: yup.number(yup.string())
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
                        <h2 id="parent-modal-title">Create animal successfully!</h2>
                        <p id="parent-modal-description">New animal have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CREATE ENCLOSURE" subtitle="Create a new Enclosure" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))"
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
                                        gridRow: '1',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Max Capacity"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.maxCapacity}
                                    name="maxCapacity"
                                    error={!!touched.maxCapacity && !!errors.maxCapacity}
                                    helperText={touched.maxCapacity && errors.maxCapacity}
                                    sx={{
                                        gridColumn: 'span 2',
                                        gridRow: '1',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Habitat"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChangeHabitatId}
                                    value={habitattId}
                                    name="habitat"
                                    defaultValue="African Savannah"
                                    sx={{
                                        gridColumn: 'span 4',
                                        gridRow: '2',
                                    }}
                                    SelectProps={{
                                        PopperProps: {
                                            anchorEl: null,
                                            placement: 'bottom-start',
                                        },
                                    }}
                                >
                                    {habitats.map((option) => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>

                                {/* Information */}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    multiline
                                    rows={3}
                                    label="Information"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.info}
                                    name="info"
                                    error={!!touched.info && !!errors.info}
                                    helperText={touched.info && errors.info}
                                    sx={{
                                        gridColumn: 'span 4',  // Span the entire width
                                        gridRow: '3',        // Below the first row
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
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/enclosures')}
                                >
                                    VIEW All ENCLOSURE
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE ENCLOSURE
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateEnclosure;

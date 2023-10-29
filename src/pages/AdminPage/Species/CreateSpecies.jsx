import { Box, Button, FormControl, Input, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getHabitats } from '~/api/animalsService';
import { createSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

function CreateSpecies() {
    const navigate = useNavigate();
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

    const [habitats, setHabitats] = useState([]);
    const [habitattId, setHabitatId] = useState([])
    const initialValues = {
        name: '',
        species: '',
        genus: '',
        family: '',
        habitatId: '',
        diet: '',
        conversationStatus: '',
        description: '',
        imgUrl: '',
        avatarUrl: '',
        status: true,

    };
    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            setHabitats(result);
        });
    }, []);

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        species: yup.string().required('Species is required'),
        genus: yup.string().required('Genus is required'),
        family: yup.string().required('Family is required'),
        habitatId: yup.number(yup.string()),
        diet: yup.string().required('Diet is required'),
        conversationStatus: yup.string().required('Conservation Status is required'),
        description: yup.string().required('Description is required'),
        imgUrl: yup.mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        avatarUrl: yup.mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const submitValue = {
                ...values,
                habitatId: habitattId,
            };
            const imgURL = await uploadFile(submitValue.imgUrl, 'create-species');
            const avatarUrl = await uploadFile(submitValue.avatarUrl, 'create-species');
            submitValue.imgUrl = imgURL;
            submitValue.avatarUrl = avatarUrl;
            const response = createSpecies(submitValue);
            console.log(submitValue);
            response.then((result) => {
                if (result.data.status === "Ok") {
                    setOpen(true);
                    resetForm();
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

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
                        <h2 id="parent-modal-title">Create Species Successfully!</h2>
                        <p id="parent-modal-description">New Species have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create Species" subtitle="Create new species" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))">
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
                                    label="Species"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.species}
                                    name="species"
                                    error={!!touched.species && !!errors.species}
                                    helperText={touched.species && errors.species}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Genus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.genus}
                                    name="genus"
                                    error={!!touched.genus && !!errors.genus}
                                    helperText={touched.genus && errors.genus}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Family"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.family}
                                    name="family"
                                    error={!!touched.family && !!errors.family}
                                    helperText={touched.family && errors.family}
                                    sx={{
                                        gridColumn: 'span 2',
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
                                    {habitats && habitats.map((option) => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Diet"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.diet}
                                    name="diet"
                                    error={!!touched.diet && !!errors.diet}
                                    helperText={touched.diet && errors.diet}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Conservation Status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.conversationStatus}
                                    name="conversationStatus"
                                    error={!!touched.conversationStatus && !!errors.conversationStatus}
                                    helperText={touched.conversationStatus && errors.conversationStatus}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />
                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        Img File
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="Image URL"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }} // Handle file input change
                                        name="imgUrl"
                                        error={!!touched.avatarUrl && !!errors.avatarUrl}
                                    />
                                    {touched.avatarUrl && errors.avatarUrl && (
                                        <div style={{ color: 'red' }}>{errors.avatarUrl}</div>
                                    )}
                                </FormControl>

                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        Avatar File
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="Avatar URL"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('avatarUrl', e.currentTarget.files[0]);
                                        }} // Handle file input change
                                        name="avatarUrl"
                                        error={!!touched.avatarUrl && !!errors.avatarUrl}
                                    />
                                    {touched.avatarUrl && errors.avatarUrl && (
                                        <div style={{ color: 'red' }}>{errors.avatarUrl}</div>
                                    )}
                                </FormControl>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/species')}
                                >
                                    VIEW All SPECIES
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE SPECIES
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateSpecies;

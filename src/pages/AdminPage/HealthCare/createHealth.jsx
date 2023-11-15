import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, Input, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { getAllAnimals } from "~/api/animalsService";
import { createHealthCare } from "~/api/healService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from "~/theme";
import uploadFile from "~/utils/transferFile";
function CreateHealth() {
    const navigate = useNavigate()
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [animals, setAnimals] = useState(null)
    const [open, setOpen] = useState(false)
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
    useEffect(() => {
        const res = getAllAnimals()
        res.then((result) => {
            setAnimals(result)
        })
    }, [])
    const initialValues = {
        weight: '',
        height: '',
        length: '',
        temperature: '',
        lifeStage: '',
        diagnosis: '',
        imgUrl: '',
        animalId: '',
    };
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const FILE_SIZE = 1920 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        weight: yup.number().required('required'),
        height: yup.number().required('required'),
        length: yup.number().required('required'),
        temperature: yup.number().required('required'),
        lifeStage: yup.string().required('required'),
        diagnosis: yup.string().required('required'),
        animalId: yup.string().required('required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),

    });

    const handleFormSubmit = async (values) => {
        try {
            const res = await uploadFile(values.imgUrl, "health");
            values.imgUrl = res
            const response = createHealthCare(values);
            response.then(result => {
                if (result.status === 200) {
                    setOpen(true);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={() => navigate('/dashboard/animals/health')}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Record Successfully!</h2>
                        <p id="parent-modal-description">Animal health have been recorded !</p>
                        <Button
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                            onClick={() => { navigate('/dashboard/animals/health') }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create Health Record" subtitle="Create a new Health Record" />
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
                                    label="Animal Name"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.animalId}
                                    name="animalId"
                                    defaultValue="1"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                >
                                    {animals && animals.map((animal) => (
                                        <MenuItem key={animal.id} value={animal.id}>
                                            {animal.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {/* <FormControl
                                    padding="0"
                                    component="fieldset"
                                    fullWidth
                                    sx={{
                                        gridColumn: 'span 1',
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            value={moment(values.recordedDateTime)}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'recordedDateTime', value: moment(date) } });
                                            }}
                                            textField={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    label="Recorded Date"
                                                />
                                            )}
                                            name="recordedDateTime"
                                            label="Recorded Date"
                                            sx={{
                                                width: 250,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: colors.grey[100],
                                                        color: colors.grey[100],
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: colors.grey[100],
                                                        color: colors.grey[100],
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: colors.grey[100],
                                                        color: colors.grey[100],
                                                    },
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </FormControl> */}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Weight"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.weight}
                                    name="weight"
                                    error={!!touched.weight && !!errors.weight}
                                    helperText={touched.weight && errors.weight}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Height"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.height}
                                    name="height"
                                    error={!!touched.height && !!errors.height}
                                    helperText={touched.height && errors.height}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Length"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.length}
                                    name="length"
                                    error={!!touched.length && !!errors.length}
                                    helperText={touched.length && errors.length}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Temperature"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.temperature}
                                    name="temperature"
                                    error={!!touched.temperature && !!errors.temperature}
                                    helperText={touched.temperature && errors.temperature}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="LifeStage"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lifeStage}
                                    name="lifeStage"
                                    error={!!touched.lifeStage && !!errors.lifeStage}
                                    helperText={touched.lifeStage && errors.lifeStage}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Diagnosis"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.diagnosis}
                                    name="diagnosis"
                                    error={!!touched.diagnosis && !!errors.diagnosis}
                                    helperText={touched.diagnosis && errors.diagnosis}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                        Image File
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="ImgUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }} // Handle file input change
                                        name="imgUrl"
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px" sx={{ justifyContent: 'space-between' }}>
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/dashboard/animals/health')}
                                >
                                    VIEW All HEALTH RECORD
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE NEW HEALTH RECORD
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateHealth;
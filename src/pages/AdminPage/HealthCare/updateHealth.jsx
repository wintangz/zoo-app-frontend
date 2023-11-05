import { Box, Button, FormControl, Input, Modal, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { updateHealthCare } from "~/api/healService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from "~/theme";
import uploadFile from "~/utils/transferFile";
function UpdateHealth() {
    const location = useLocation()
    console.log(location.state)
    const [health, setHealth] = useState(location.state)
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const initialValues = {
        weight: health.weight,
        height: health.height,
        length: health.length,
        temperature: health.temperature,
        lifeStage: health.lifeStage,
        diagnosis: health.diagnosis,
        imgUrl: health.imgUrl,
        animalId: health.animal.id,
    };
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
    const FILE_SIZE = 1920 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        animalId: yup.string().required('required'),
        weight: yup.number().required('required'),
        height: yup.number().required('required'),
        length: yup.number().required('required'),
        temperature: yup.number().required('required'),
        lifeStage: yup.string().required('required'),
        diagnosis: yup.string().required('required'),
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

    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        navigate('/home/animals/health')
    }
    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            // values.animalName = null;
            delete values.animalName;
            if (values.imgUrl instanceof File) {
                values.imgUrl = await uploadFile(values.imgUrl, "health");
            }
            console.log(values);

            const res = updateHealthCare(location.state.id, values);
            console.log(res);
            res.then(result => {
                if (result.status === 200) {
                    setOpen(true)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
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
                        <h2 id="parent-modal-title">Update Health Record successfully!</h2>
                        <p id="parent-modal-description">Health Record have been update to DataBase!</p>
                        <Button onClick={handleClose} color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update Health Record" subtitle="Update health record to database" />
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
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="animalName"
                                    value={health.animal.name}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />


                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Weight"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.weight}
                                    defaultValue={health.weight}
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
                                    defaultValue={health.height}
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
                                    defaultValue={health.length}
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
                                    defaultValue={health.temperature}
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
                                    defaultValue={health.lifeStage}
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
                                    defaultValue={health.diagnosis}
                                    name="diagnosis"
                                    error={!!touched.diagnosis && !!errors.diagnosis}
                                    helperText={touched.diagnosis && errors.diagnosis}
                                    sx={{
                                        gridColumn: 'span 2',
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
                                    />
                                </FormControl>
                                <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button onClick={() => {
                                    navigate("/home/animals/health")
                                }} color="secondary" variant="contained">
                                    VIEW HEALTH RECORD
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    UPDATE HEALTH RECORD
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default UpdateHealth;
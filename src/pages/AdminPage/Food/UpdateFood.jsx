import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getFoodById, updateFoods } from '~/api/foodService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

function UpdateFood() {
    const { foodId } = useParams();
    const [food, setFood] = useState({});
    const navigate = useNavigate();

    const fetchapi = async (id) => {
        const result = await getFoodById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(foodId);
        res.then((result) => {
            setFood(result);
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
    const initialValues = {
        name: food?.name || '',
        type: food?.type || '',
        status: food?.status ? 'true' : 'false',
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is not empty'),
        type: yup.string().required('Type is not empty'),
    });

    const handleFormSubmit = async (values) => {
        try {
            const response = await updateFoods(foodId, values);
            console.log(values);
            console.log(response);
            if (response?.status === 200) {
                setOpen(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        navigate('/home/foods');
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
                        <h2 id="parent-modal-title">Update Food Successfully!</h2>
                        <p id="parent-modal-description">New food have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update Foods" subtitle="Update new food" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema} enableReinitialize={true}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
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
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                    name="type"
                                    error={!!touched.type && !!errors.type}
                                    helperText={touched.type && errors.type}
                                />
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
                                            value="true"
                                            control={
                                                <Radio
                                                    sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                />
                                            }
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="false"
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
                                    onClick={() => navigate('/home/foods')}
                                >
                                    VIEW FOODS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    UPDATE FOOD
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default UpdateFood;

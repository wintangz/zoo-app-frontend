import { Box, Button, Chip, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createDiet } from '~/api/dietService';
import { getFood } from '~/api/foodService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function CreateDiet() {
    const navigate = useNavigate();
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [foods, setFoods] = useState([])

    const [foodListId, setFoodListId] = useState([])
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
        type: '',
        foodListIds: '',
    };

    const userSchema = yup.object().shape({
        type: yup.string().required('Type is not empty'),
        foodListIds: yup.array(yup.string())
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            const submitValue = {
                type: values.type,
                foodListIds: foodListId,
            };
            const response = await createDiet(submitValue);
            console.log(submitValue);
            if (response?.status === "Ok") {
                setOpen(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };
    const handleChangeFoodId = (event) => {
        setFoodListId(event.target.value)
    }
    const handleClose = () => {
        navigate('/home/diets');
    };
    const fetchApi = async () => {
        const result = await getFood();
        setFoods(result);
    };

    useEffect(() => {
        fetchApi();
    }, []);

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
                        <h2 id="parent-modal-title">"Create Diet Successfully!"</h2>
                        <p id="parent-modal-description">New diet have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Create Diet" subtitle="Create new diet" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box>
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
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    style={{
                                        width: '100%'
                                    }}
                                    multiple
                                    value={foodListId}
                                    onChange={handleChangeFoodId}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => {
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((id) => {
                                                    return (
                                                        <Chip key={id} label={foods.find((food) => food.id === id)?.name} />
                                                    )
                                                })}
                                            </Box>
                                        )
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {foods && foods.map((food) => {
                                        return (
                                            <MenuItem
                                                key={food.id}
                                                value={food.id}

                                            >
                                                {food.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/diets')}
                                >
                                    VIEW DIETS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE DIET
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateDiet;

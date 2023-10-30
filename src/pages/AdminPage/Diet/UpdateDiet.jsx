import { Box, Button, Chip, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getDietById, updateDiets } from '~/api/dietService';
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

function UpdateDiets() {
    const navigate = useNavigate();
    const { dietsId } = useParams();
    const [diets, setDiets] = useState({});
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [foods, setFoods] = useState([])
    const location = useLocation()
    useEffect(() => {
        console.log(location.state);
        setDiets(location.state);
    }, []);
    const foodListIds = location.state.foodList;
    const [foodListId, setFoodListId] = useState(foodListIds.map(result => result.id));
    console.log(foodListId)
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
        type: diets?.type || '',
        foodListIds: [].id,
    };
    const userSchema = yup.object().shape({
        type: yup.string().required('Type is not empty'),
        foodListIds: yup.array(yup.string())
    });

    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const submitValue = {
                type: values.type,
                foodListIds: foodListId,
            };
            const response = await updateDiets(dietsId, submitValue);
            console.log(submitValue);
            if (response?.status === 200) {
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
    const fetchapi = async (id) => {
        const result = await getDietById(id);
        return result;
    };
    useEffect(() => {
        fetchApi()
        const res = fetchapi(dietsId);
        res.then((result) => {
            console.log(result);
            setDiets(result);
        });
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
                        <h2 id="parent-modal-title">"Update Diet Successfully!"</h2>
                        <p id="parent-modal-description">New diet have been add to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update Diet" subtitle="Update new diet" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema} enableReinitialize={true}>
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


                                {console.log(foodListIds)}
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    style={{
                                        width: '100%'
                                    }}
                                    multiple
                                    value={foodListId}
                                    name="foodListId"
                                    defaultValue={foodListIds.map(result => { return result.id })}
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
                                    {foods.map((food) => {
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
                                    UPDATE DIET
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default UpdateDiets;

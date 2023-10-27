import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Formik } from 'formik';
import moment from 'moment/moment';
import * as yup from 'yup';

import { getUserById, updateUser } from '~/api/userService';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

function Profile() {

    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width: 600px)');

    const [open, setOpen] = useState(false);

    const [users, setUsers] = useState({});



    const id = decode(localStorage.getItem('token')).sub;
    useEffect(() => {
        const res = getUserById(id);
        res.then((result) => {
            setUsers(result);
        });
    }, []);


    const handleFormSubmit = async (values) => {
        const inputDate = new Date(values.dateOfBirth);
        const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
        // Get the time zone offset and convert it to the "hh:mm" format
        const timeZoneOffsetHours = inputDate.getTimezoneOffset() / 60;
        const timeZoneOffsetMinutes = Math.abs(inputDate.getTimezoneOffset() % 60);
        const formattedTimeZoneOffset = `${Math.abs(timeZoneOffsetHours)
            .toString()
            .padStart(2, '0')}:${timeZoneOffsetMinutes.toString().padStart(2, '0')}:00`;

        // Combine the date and time zone offset to get the final formatted string
        const formattedDateTime = `${formattedDate}T${formattedTimeZoneOffset}`;
        values.dateOfBirth = formattedDateTime;
        if (values.sex === 'male') {
            values.sex = true;
        } else if (values.sex === 'female') {
            values.sex = false;
        }
        const res = updateUser(id, values);
        console.log(values);
        res.then((result) => {
            const status = result.status;
            if (status === 200) {
                setOpen(true);
            }
        });
    };


    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
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

    const initialValues = {
        username: users?.username || '',
        lastname: users?.lastname || '',
        firstname: users?.firstname || '',
        sex: users?.sex ? 'male' : 'female',
        dateOfBirth: moment(users?.dateOfBirth),
        address: users?.address || '',
        nationality: users?.nationality || '',
        phone: users?.phone || '',
        email: users?.email || '',
        avatarUrl: users?.avatarUrl || '',
    };

    const userSchema = yup.object().shape({
        lastname: yup.string().required('Last Name is required'),
        firstname: yup.string().required('First Name is required'),
        sex: yup.string().required('required'),
        dateOfBirth: yup.date()
            .required('Birth Date is required')
            .max(new Date(), 'Date of Birth cannot be in the future'),
        address: yup.string().required('Address is required'),
        nationality: yup.string().required('Country is required'),
        phone: yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone numbers is not valid').required('required'),
        email: yup.string().email('Invalid email').required('required'),
    });

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
                        <h2 id="parent-modal-title">Update User Successfully!</h2>
                        <p id="parent-modal-description">User have been update to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>



            <Box m="20px" sx={{ marginRight: '126px' }}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <>
                            <Box mb="60px" mt="30px" ml="20px">
                                <Typography color="rgb(248, 191, 2)" variant="h3" fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
                                    Edit Profile
                                </Typography>
                                <Typography variant="h6">
                                    Welcome, <span style={{ fontWeight: "bold", color: 'rgb(248, 191, 2)', fontSize: '1.5rem' }}>{values.firstname}</span>
                                </Typography>
                            </Box>
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
                                        variant="outlined"
                                        type="text"
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.lastname}
                                        name="lastname"
                                        error={!!touched.lastname && !!errors.lastname}
                                        helperText={touched.lastname && errors.lastname}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.firstname}
                                        name="firstname"
                                        error={!!touched.firstname && !!errors.firstname}
                                        helperText={touched.firstname && errors.firstname}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />

                                    <FormControl
                                        component="fieldset"
                                        width="75%"
                                        sx={{
                                            gridColumn: 'span 1',
                                        }}
                                        label="Gender"
                                    >
                                        <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                            Gender
                                        </Typography>
                                        <RadioGroup
                                            aria-label="Gender"
                                            name="sex"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            defaultValue=" "
                                            value={values.sex}
                                            sx={{ display: 'inline-block' }}
                                            label="Gender"
                                        >
                                            <FormControlLabel
                                                value="male"
                                                control={
                                                    <Radio
                                                        sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                    />
                                                }
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control={
                                                    <Radio
                                                        sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                    />
                                                }
                                                label="Female"
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControl
                                        padding="0"
                                        component="fieldset"
                                        fullWidth
                                        sx={{
                                            gridColumn: 'span 1',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                value={moment(values.dateOfBirth)}
                                                onChange={(date) => {
                                                    handleChange({
                                                        target: { name: 'dateOfBirth', value: moment(date) },
                                                    });
                                                }}
                                                textField={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        variant="outlined"
                                                        label="Date of Birth"
                                                    />
                                                )}
                                                name="dateOfBirth"
                                                label="What is your date of birth?"
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
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Emai"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.email}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        sx={{
                                            gridColumn: 'span 2',
                                            marginTop: '15px',
                                        }}
                                    />


                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="National"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.nationality}
                                        name="nationality"
                                        error={!!touched.nationality && !!errors.nationality}
                                        helperText={touched.nationality && errors.nationality}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Contact"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.phone}
                                        name="phone"
                                        error={!!touched.phone && !!errors.phone}
                                        helperText={touched.phone && errors.phone}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        defaultValue=" "
                                        value={values.address}
                                        name="address"
                                        error={!!touched.address && !!errors.address}
                                        helperText={touched.address && errors.address}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />

                                </Box>
                                <Box display="flex" justifyContent="space-between" mt="30px">

                                    <Button type="submit" variant="contained"
                                        sx={{
                                            color: 'white', // Text color
                                            backgroundColor: 'rgb(248, 191, 2)',
                                            '&:hover': {
                                                backgroundColor: 'rgb(218, 161, 2)',
                                            },
                                        }}
                                    >
                                        UPDATE ACCOUNT
                                    </Button>

                                </Box>
                            </form>
                        </>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default Profile;
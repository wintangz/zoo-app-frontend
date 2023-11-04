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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Formik } from 'formik';
import moment from 'moment/moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createStaff, createZooTrainer } from '~/api/userService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import { formatDateTimeSubmit } from '~/utils/dateTimeFormat';

function Form() {
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
    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const handleFormSubmit = async (values) => {
        const formattedDateTime = formatDateTimeSubmit(values.dateOfBirth)
        // const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
        //     .toString()
        //     .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
        // // Get the time zone offset and convert it to the "hh:mm" format
        // const timeZoneOffsetHours = inputDate.getTimezoneOffset() / 60;
        // const timeZoneOffsetMinutes = Math.abs(inputDate.getTimezoneOffset() % 60);
        // const formattedTimeZoneOffset = `${Math.abs(timeZoneOffsetHours)
        //     .toString()
        //     .padStart(2, '0')}:${timeZoneOffsetMinutes.toString().padStart(2, '0')}:00`;

        // // Combine the date and time zone offset to get the final formatted string
        // const formattedDateTime = `${formattedDate}T${formattedTimeZoneOffset}`;

        values.dateOfBirth = formattedDateTime;
        if (values.sex === 'male') {
            values.sex = true;
        } else if (values.sex === 'female') {
            values.sex = false;
        }
        if (userRole === 'ADMIN') {
            const response = await createStaff(values);
            if (response) {
                const status = response.status;
                console.log(response);
                if (status === 200) {
                    setOpen(true);
                } else if (status === 400) {
                    response.data.clientErrors !== "" ? document.getElementById('error-message').innerHTML = response.data.clientErrors.map(res => res)
                        : document.getElementById('error-message').innerHTML = response.data.serverError
                }
            }
        }
        if (userRole === 'STAFF') {
            const response = await createZooTrainer(values);
            if (response) {
                const status = response.status;
                console.log(response)
                if (status === 200) {
                    setOpen(true);
                }
            }
        }


    };

    let modalTitle = '';
    let description = '';
    let button = '';
    let button1 = '';
    let title = '';
    let subtitle = '';

    if (userRole === 'ADMIN') {
        modalTitle = 'Create new staff successfully!';
        description = 'New staff have been add to DataBase!';
        button = 'CREATE NEW STAFF';
        button1 = 'VIEW ALL USER';
        title = 'Create User';
        subtitle = 'Create a New User Profile';
    } else if (userRole === 'STAFF') {
        modalTitle = 'Create new Zoo Trainer successfully!';
        description = 'New zoo trainer have been add to DataBase!';
        button = 'CREATE NEW ZOO TRAINER';
        button1 = 'VIEW ALL ZOO TRAINER';
        title = 'CREATE ZOO TRAINER';
        subtitle = 'Create a New Zoo Trainer Profile';
    }
    const initialValues = {
        username: '',
        password: '',
        lastname: '',
        firstname: '',
        sex: 'male',
        dateOfBirth: null,
        address: '',
        nationality: '',
        phone: '',
        email: '',
    };

    const userSchema = yup.object().shape({
        username: yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters'),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        lastname: yup.string().required('Last Name is required'),
        firstname: yup.string().required('First Name is required'),
        sex: yup.string().required('required'),
        dateOfBirth: yup.date()
            .required('Birth Date is required'),
        // .max(new Date(), 'Date of Birth cannot be in the future'),
        address: yup.string().required('Address is required'),
        nationality: yup.string().required('Country is required'),
        phone: yup.string()
            .required('Phone Number is required')
            .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number format'),
        email: yup.string().email('Invalid email address').required('Email is required'),
    });

    const handleClose = () => {
        navigate('/home/home');
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
                        <h2 id="parent-modal-title">{modalTitle}</h2>
                        <p id="parent-modal-description">{description}</p>
                        <Button onClick={handleClose} color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title={title} subtitle={subtitle} />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                                    label="Username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    name="username"
                                    error={!!touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    variant="filled"
                                    type="text"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                        value={values.sex}
                                        sx={{ display: 'inline-block' }}
                                        label="Gender"
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={
                                                <Radio sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }} />
                                            }
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={
                                                <Radio sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }} />
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
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            value={moment(values.dateOfBirth)}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'dateOfBirth', value: moment(date) } });
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
                                    variant="filled"
                                    type="text"
                                    label="Address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    name="address"
                                    error={!!touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                    sx={{
                                        gridColumn: 'span 4',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="National"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    variant="filled"
                                    type="text"
                                    label="Contact"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        gridColumn: 'span 4',
                                    }}
                                />
                                <p id='error-message' style={{ color: 'red', gridColumn: 'span 4', display: 'flex', flexDirection: 'row-reverse' }}></p>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home')}
                                >
                                    {button1}
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    {button}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default Form;

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { createZooTrainer } from '~/api/data/mockData';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';

function CreateZooTrainer() {
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
        console.log(values.dateOfBirth);
        const inputDate = new Date(values.dateOfBirth);

        // Get the date part in the "yyyy-MM-dd" format
        // const formattedDate = inputDate.toISOString().split('T')[0];

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
        // values.roles =  [
        //     {
        //         "id": "1",
        //         "name": "ADMIN"
        //     }
        // ]

        const test = async () => {
            const result = await createZooTrainer(values);
            console.log(result);
            const status = result.status;
            if (status === 200) {
                setOpen(true);
            }
            resetForm();
        };
        test();
    };
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

    const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
    const userSchema = yup.object().shape({
        username: yup.string().required('required'),
        password: yup.string().required('required').min(8, 'Must be min 8 characters').max(30),
        lastname: yup.string().required('required'),
        firstname: yup.string().required('required'),
        sex: yup.string().required('required'),
        dateOfBirth: yup.date().required('required'),
        address: yup.string().required('required'),
        nationality: yup.string().required('required'),
        phone: yup.string().matches(phoneRegExp, 'Phone numbers is not valid').required('required'),
        email: yup.string().email('Invalid email').required('required'),
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
                        <h2 id="parent-modal-title">Create new zoo trainer successfully!</h2>
                        <p id="parent-modal-description">New zoo trsiner have been add to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CREATE ZOO TRAINER" subtitle="Create a New Zoo Trainer Profile" />
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
                                    label="User Name"
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
                                    type="text"
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={values.dateOfBirth}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'dateOfBirth', value: date } });
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
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE NEW ZOO TRAINER
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateZooTrainer;

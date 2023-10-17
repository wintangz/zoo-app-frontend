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
    Input,
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Formik } from 'formik';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
import { getSpecies } from '~/api/speciesService';
import { createAnimals } from '~/api/animalsService';
// import { DataGridPro } from '@mui/x-data-grid-pro';
function CreateAnimal() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [species, setSpecies] = useState([]);
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
        const res = getSpecies();
        res.then((result) => {
            setSpecies(result);
        });
    }, []);
    const formattedDateTime = (values) => {
        const inputDate = new Date(values);

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
        return formattedDateTime;
    };
    const handleFormSubmit = async (values, { resetForm }) => {
        values.dateOfBirth = formattedDateTime(values.dateOfBirth);
        values.arrivalDate = formattedDateTime(values.arrivalDate);
        try {
            const imgURL = await uploadFile(values, 'animals-individual'); // Wait for the file upload to complete
            values.imgUrl = imgURL;
            const res = createAnimals(values);
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 'Ok') {
                    setOpen(true);
                    resetForm();
                }
            });
            // Optionally, you can display a success message or perform other actions here
        } catch (error) {
            console.error(error);
            // Handle errors if needed
        }
    };

    const initialValues = {
        name: '',
        sex: 'true',
        imgUrl: '',
        arrivalDate: null,
        dateOfBirth: null,
        origin: '',
        species: '',
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('required'),
        sex: yup.string().required('required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        arrivalDate: yup.date().required('required'),
        dateOfBirth: yup.date().required('required'),
        origin: yup.string().required('required'),
        species: yup.string().required('required'),
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
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CREATE ANIMAL" subtitle="Create a new animal" />
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
                                    }}
                                />
                                <FormControl
                                    component="fieldset"
                                    width="75%"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                    label="Gender"
                                >
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                        Gender
                                    </Typography>
                                    <RadioGroup
                                        aria-label="Sex"
                                        name="sex"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.sex}
                                        sx={{ display: 'inline-block' }}
                                        label="Gender"
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={
                                                <Radio sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }} />
                                            }
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="false"
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
                                            label="What is the animal's date of birth?"
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

                                <FormControl
                                    padding="0"
                                    component="fieldset"
                                    fullWidth
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            value={moment(values.arrivalDate)}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'arrivalDate', value: moment(date) } });
                                            }}
                                            textField={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    label="Arrival Date"
                                                />
                                            )}
                                            name="arrivalDate"
                                            label="What is the animal's arrival date?"
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
                                    label="Origin"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.origin}
                                    name="origin"
                                    error={!!touched.origin && !!errors.origin}
                                    helperText={touched.origin && errors.origin}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Species"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.species}
                                    name="species"
                                    defaultValue="Tiger"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                    SelectProps={{
                                        PopperProps: {
                                            anchorEl: null, // Ensures the menu is always at the bottom
                                            placement: 'bottom-start', // Adjust the placement as needed
                                        },
                                    }}
                                >
                                    {species.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

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
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE ANIMAL
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateAnimal;

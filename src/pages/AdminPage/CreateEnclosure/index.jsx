import {
    Box,
    Button,
    FormControl,
    TextField,
    Typography,
    useTheme,
    Input,
} from '@mui/material';

import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';
// import uploadFile from '~/utils/transferFile';
import { getSpecies } from '~/api/speciesService';
import { getHabitats } from '~/api/animalsService';
// import { createAnimals } from '~/api/animalsService';
// import { DataGridPro } from '@mui/x-data-grid-pro';
import moment from 'moment/moment';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function CreateEnclosure() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [species, setSpecies] = useState([]);
    const [habitats, setHabitats] = useState([]);

    // const formattedDateTime = (values) => {
    //     const inputDate = new Date(values);

    //     const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
    //         .toString()
    //         .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    //     // Get the time zone offset and convert it to the "hh:mm" format
    //     const timeZoneOffsetHours = inputDate.getTimezoneOffset() / 60;
    //     const timeZoneOffsetMinutes = Math.abs(inputDate.getTimezoneOffset() % 60);
    //     const formattedTimeZoneOffset = `${Math.abs(timeZoneOffsetHours)
    //         .toString()
    //         .padStart(2, '0')}:${timeZoneOffsetMinutes.toString().padStart(2, '0')}:00`;

    //     // Combine the date and time zone offset to get the final formatted string
    //     const formattedDateTime = `${formattedDate}T${formattedTimeZoneOffset}`;
    //     return formattedDateTime;
    // };

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

    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            setHabitats(result);
        });
    }, []);



    // const handleFormSubmit = async (values, { resetForm }) => {

    //     try {
    //         const imgURL = await uploadFile(values, 'animals-individual'); // Wait for the file upload to complete
    //         values.imgUrl = imgURL;
    //         const res = createAnimals(values);
    //         res.then((result) => {
    //             console.log(result);
    //             const status = result.status;
    //             if (status === 'Ok') {
    //                 setOpen(true);
    //                 resetForm();
    //             }
    //         });
    //         // Optionally, you can display a success message or perform other actions here
    //     } catch (error) {
    //         console.error(error);
    //         // Handle errors if needed
    //     }
    // };

    const initialValues = {
        name: '',
        maxCapacity: '',
        info: '',
        imgUrl: '',
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name cannot be empty'),
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
        info: yup.string().required('Infomation cannot be empty'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
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
                <AdminHeader title="CREATE ENCLOSURE" subtitle="Create a new Enclosure" />
                <Formik /*onSubmit={handleFormSubmit}*/ initialValues={initialValues} validationSchema={userSchema}>
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
                                        gridRow: '1',
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Max Capacity"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.maxCapacity}
                                    name="maxCapacity"
                                    error={!!touched.maxCapacity && !!errors.maxCapacity}
                                    helperText={touched.maxCapacity && errors.maxCapacity}
                                    sx={{
                                        gridColumn: 'span 2',
                                        gridRow: '1',
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

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Habitat"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.habitats}
                                    name="habitat"
                                    defaultValue="African Savannah"
                                    sx={{
                                        gridColumn: 'span 2',
                                        gridRow: '2',
                                    }}
                                    SelectProps={{
                                        PopperProps: {
                                            anchorEl: null, // Ensures the menu is always at the bottom
                                            placement: 'bottom-start', // Adjust the placement as needed
                                        },
                                    }}
                                >
                                    {habitats.map((option) => (
                                        <MenuItem key={option.id} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* Information */}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    multiline
                                    rows={3}
                                    label="Information"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.info}
                                    name="information"
                                    error={!!touched.info && !!errors.info}
                                    helperText={touched.info && errors.info}
                                    sx={{
                                        gridColumn: 'span 4',  // Span the entire width
                                        gridRow: '3',        // Below the first row
                                    }}
                                />
                                <FormControl
                                    component="fieldset"
                                    sx={{
                                        // gridColumn: 'span 2',  // Span the entire width
                                        gridRow: '4',        // Below the first row
                                    }}>
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
                                            value={moment(values.createdDate)}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'createdDate', value: moment(date) } });
                                            }}
                                            textField={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    label="Create Date"
                                                />
                                            )}
                                            name="createdDate"
                                            label="What is the enclosure's create date?"
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

                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE ENCLOSURE
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default CreateEnclosure;

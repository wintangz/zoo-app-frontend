import { useTheme } from "@emotion/react";
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, FormControl, FormControlLabel, Input, Modal, Radio, RadioGroup, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "~/theme";
import * as yup from "yup";
import { Formik } from "formik";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment/moment";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { getSpecies } from '~/api/speciesService';
import { useEffect } from "react";
import { formatDateTimeSubmit } from "~/utils/dateTimeFormat";
import { updateAnimal } from "~/api/animalsService";

function UpdateAnimal() {
    const location = useLocation()
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const theme = useTheme({});
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [death, setDeath] = useState(location.state.status)
    const navigate = useNavigate();
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
    const [species, setSpecies] = useState(null);
    useEffect(() => {
        const res = getSpecies();
        res.then((result) => {
            setSpecies(result);
        });
    }, []);

    const isNonMobile = useMediaQuery('(min-width: 600px)');
    const initialValues = {
        name: location.state.name,
        sex: location.state.sex,
        imgUrl: location.state.imgUrl,
        arrivalDate: location.state.arrivalDate,
        dateOfBirth: location.state.dateOfBirth,
        origin: location.state.origin,
        species: location.state.species,
        status: location.state.status,
        dateOfDeath: null,
    };
    const userSchema = yup.object().shape({
        name: yup.string().required('required'),
        sex: yup.string().required('required'),
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
        arrivalDate: yup.date().required('required'),
        dateOfBirth: yup.date().required('required'),
        origin: yup.string().required('required'),
        species: yup.string().required('required'),
        status: yup.string().required('required'),
        dateOfDeath: yup.date().nullable(true),
    });

    const handleFormSubmit = (values) => {
        values.arrivalDate = formatDateTimeSubmit(values.arrivalDate)
        values.dateOfBirth = formatDateTimeSubmit(values.dateOfBirth)
        if (values.status === "true") {
            values.dateOfDeath = null;
        } else {
            if (values.dateOfDeath) {
                values.dateOfDeath = formatDateTimeSubmit(values.dateOfDeath)
            }
        }
        console.log(values)
        const res = updateAnimal(location.state.id, values);
        res.then(result => {
            console.log(result);
            if (result.status === 200) {
                setOpen(true);
            }
        })
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={() => { setOpen(false) }}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Update animal successfully!</h2>
                        <p id="parent-modal-description">New animal have been Update to DataBase!</p>
                        <Button
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                            onClick={() => {
                                setOpen(false);
                                navigate('/home/animals');
                            }}>Close
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update Animal" subtitle="Update animal to database" />
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
                                    defaultValue={location.state.name}
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
                                    {species && species.map((option) => (
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
                                    <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />
                                </FormControl>

                                <FormControl
                                    component="fieldset"
                                    width="75%"
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                    label="Status"
                                >
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                        Status
                                    </Typography>
                                    <RadioGroup
                                        aria-label="status"
                                        name="status"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.status}
                                        sx={{ display: 'inline-block' }}
                                        label="Status"
                                    >
                                        {setDeath(values.status)}

                                        <FormControlLabel
                                            value={true}
                                            control={
                                                <Radio sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }} />
                                            }
                                            label="Alive"
                                        />
                                        <FormControlLabel

                                            value={false}
                                            control={
                                                <Radio sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }} />
                                            }
                                            label="Death"
                                        />


                                    </RadioGroup>
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
                                            value={moment(values.dateOfDeath)}
                                            onChange={(date) => {
                                                handleChange({ target: { name: 'dateOfDeath', value: moment(date) } });
                                            }}
                                            textField={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    variant="outlined"
                                                    label="Date of death"
                                                />
                                            )}
                                            name="dateOfDeath"
                                            label="What is the animal's date of death? (Optional)"
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


                                {/* ----------------------------------------------------Date Of Death ----------------------------------------------------*/}
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="20px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/home/animals')}
                                >
                                    VIEW ANIMALS
                                </Button>
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

export default UpdateAnimal;
import { Box, Button, FormControl, FormControlLabel, Input, MenuItem, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getHabitats } from '~/api/animalsService';
import { getSpeciesById, updateSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

function UpdateSpecies() {
    const { speciesId } = useParams();
    const [species, setSpecies] = useState({});
    const navigate = useNavigate();
    const [habitats, setHabitats] = useState([]);
    const [habitattId, setHabitatId] = useState([])
    const fetchapi = async (id) => {
        const result = await getSpeciesById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(speciesId);
        res.then((result) => {
            setSpecies(result);
            setHabitatId(result.habitatId || '');
        });
    }, []);
    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            setHabitats(result);
        });
    }, []);

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }
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
        name: species?.name || '',
        species: species?.species || '',
        genus: species?.genus || '',
        family: species?.family || '',
        habitatId: species?.habitatId || '',
        diet: species?.diet || '',
        conversationStatus: species?.conversationStatus || '',
        description: species?.description || '',
        imgUrl: species?.imgUrl || '',
        avatarUrl: species?.avatarUrl || '',
        status: species?.status ? 'True' : 'False',
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        habitatId: yup.string().required('Habitat is required'),
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
        avatarUrl: yup
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

    const handleFormSubmit = async (values) => {
        try {
            const submitValue = { ...values, habitatId: habitattId, };
            console.log(submitValue);
            if (values.imgUrl instanceof File) {
                const imgURL = await uploadFile(submitValue.imgUrl, 'update-species');
                submitValue.imgUrl = imgURL;
            }
            if (values.avatarUrl instanceof File) {
                const avatarURL = await uploadFile(submitValue.avatarUrl, 'update-species');
                submitValue.avatarUrl = avatarURL;
            }
            const response = updateSpecies(speciesId, submitValue);
            response.then((result) => {
                if (result.data.status === "Ok") {
                    setOpen(true);
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        navigate('/home/species');
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
                        <h2 id="parent-modal-title">"Update Species Successfully!"</h2>
                        <p id="parent-modal-description">New species have been update to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="Update Species" subtitle="Update Species" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}
                    enableReinitialize={true}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))">
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

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Species"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.species}
                                    name="species"
                                    error={!!touched.species && !!errors.species}
                                    helperText={touched.species && errors.species}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Genus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.genus}
                                    name="genus"
                                    error={!!touched.genus && !!errors.genus}
                                    helperText={touched.genus && errors.genus}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Family"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.family}
                                    name="family"
                                    error={!!touched.family && !!errors.family}
                                    helperText={touched.family && errors.family}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Habitat"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChangeHabitatId}
                                    value={habitattId}
                                    name="habitat"
                                    defaultValue={habitattId}
                                    sx={{
                                        gridColumn: 'span 4',
                                        gridRow: '2',
                                    }}
                                    SelectProps={{
                                        PopperProps: {
                                            anchorEl: null,
                                            placement: 'bottom-start',
                                        },
                                    }}
                                >
                                    {habitats.map((option) => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    })}
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Diet"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.diet}
                                    name="diet"
                                    error={!!touched.diet && !!errors.diet}
                                    helperText={touched.diet && errors.diet}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Conservation Status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.conversationStatus}
                                    name="conversationStatus"
                                    error={!!touched.conservationStatus && !!errors.conservationStatus}
                                    helperText={touched.conservationStatus && errors.conservationStatus}
                                    sx={{
                                        gridColumn: 'span 2',
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
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
                                    <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />
                                </FormControl>

                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                        Avatar File
                                    </Typography>
                                    <Input
                                        type="file"
                                        label="Avatar URL"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('avatarUrl', e.currentTarget.files[0]);
                                        }} // Handle file input change
                                        name="avatarUrl"
                                    />
                                    <img src={values.avatarUrl} alt='' style={{ width: "150px", height: "70px" }} />
                                </FormControl>

                                <FormControl
                                    component="fieldset"
                                    width="75%"
                                    sx={{
                                        gridColumn: 'span 1',
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
                                        value={values.status}
                                        sx={{ display: 'inline-block' }}
                                        label="Status"
                                    >
                                        <FormControlLabel
                                            value="True"
                                            control={
                                                <Radio
                                                    sx={{ '&.Mui-checked': { color: colors.blueAccent[100] } }}
                                                />
                                            }
                                            label="True"
                                        />
                                        <FormControlLabel
                                            value="False"
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
                                    onClick={() => navigate('/home/species')}
                                >
                                    VIEW All SPECIES
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    UPDATE SPECIES
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default UpdateSpecies;

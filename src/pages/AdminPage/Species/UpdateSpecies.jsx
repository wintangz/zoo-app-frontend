import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getSpeciesById, updateSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

function UpdateSpecies() {
    const { speciesId } = useParams();
    const [species, setSpecies] = useState({});
    const navigate = useNavigate();

    const fetchapi = async (id) => {
        const result = await getSpeciesById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(speciesId);
        res.then((result) => {
            setSpecies(result);

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
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const userRole = decode(localStorage.getItem('token')).roles[0];
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

    const typeOptions = ['Event', 'Info'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        species: yup.string().required('Species is required'),
        genus: yup.string().required('Genus is required'),
        family: yup.string().required('Family is required'),
        habitatId: yup.string().required('Habitat is required'),
        diet: yup.string().required('Diet is required'),
        conservationStatus: yup.string().required('Conservation Status is required'),
        description: yup.string().required('Description is required'),
        imgUrl: yup.string().url('Invalid URL format').required('Image URL is required'),
        avatarUrl: yup.string().url('Invalid URL format').required('Avatar URL is required'),
        status: yup.boolean().required('Status is required'),
    });

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const submitValue = { ...values, content: editorContent };
            const response = await updateSpecies(speciesId, submitValue);
            console.log(submitValue);
            if (response?.status === 200) {
                setOpen(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const handleClose = () => {
        navigate('/viewallspecies');
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
                                    label="Species"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.species}
                                    name="species"
                                    error={!!touched.species && !!errors.species}
                                    helperText={touched.species && errors.species}
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
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="HabitatId"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.habitat}
                                    name="habitatId"
                                    error={!!touched.habitat && !!errors.habitat}
                                    helperText={touched.habitat && errors.habitat}
                                />

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
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Image URL"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.imgUrl}
                                    name="imgUrl"
                                    error={!!touched.imgUrl && !!errors.imgUrl}
                                    helperText={touched.imgUrl && errors.imgUrl}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Avatar URL"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.avatarUrl}
                                    name="avatarUrl"
                                    error={!!touched.avatarUrl && !!errors.avatarUrl}
                                    helperText={touched.avatarUrl && errors.avatarUrl}
                                />

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
                                    onClick={() => navigate('/viewspecies')}
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

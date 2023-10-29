import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getEnclosuresById, getHabitats, updateEnclosures } from '~/api/animalsService';
import { getSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

function UpdateEnclosure() {
    //--------------- Call API GET USER ---------------------------------//'
    const location = useLocation()
    const { enclosureId } = useParams();
    const [enclosure, setEnclosure] = useState({});
    const navigate = useNavigate();
    const [species, setSpecies] = useState([]);
    const [habitats, setHabitats] = useState([]);


    useEffect(() => {

        setEnclosure(location.state);
    }, []);

    //****************---------------------- Config Color Theme ****************************/
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);

    // ******************************** MODAL FUCTION ********************************/
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
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        navigate('/home/enclosures');
    };

    //---------------------------------------- Handle Submit----------------------------------/

    const handleFormSubmit = async (values) => {
        if (values.imgUrl instanceof File) {
            const imgURL = await uploadFile(values.imgUrl, 'update-news');
            values.imgUrl = imgURL;
        }
        console.log(location.state)
        console.log(values)
        const res = updateEnclosures(enclosureId, values);
        console.log(res)
        res.then((result) => {
            const status = result.status;
            if (status === 200) {
                setOpen(true);
            }
        });
    };

    //********************************** INITIAL VALUE*********************************** */
    const initialValues = {
        name: enclosure?.name || '',
        maxCapacity: enclosure?.maxCapacity || '',
        info: enclosure?.info || '',
        imgUrl: enclosure?.imgUrl || '',
        status: enclosure?.status ? 'True' : 'False',

    };

    //****************************** VALIDATION ********************************
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
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
    });

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
                        <h2 id="parent-modal-title">Update Enclosure Successfully!</h2>
                        <p id="parent-modal-description">Enclosure have been update to DataBase!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                <AdminHeader title="Update Enclosure" subtitle="Update your Enclosure" />
            </Box>

            <>
                <Box m="20px">
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={userSchema}
                        enableReinitialize={true}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        defaultValue=" "
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
                                        label="Habitat"
                                        select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.habitats}
                                        name="habitat"
                                        defaultValue={location.state.habitat}
                                        sx={{
                                            gridColumn: 'span 2',
                                            gridRow: '2',
                                        }}

                                    >
                                        {habitats.map((option) => (
                                            <MenuItem key={option.id} value={option}>
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
                                        name="info"
                                        error={!!touched.info && !!errors.info}
                                        helperText={touched.info && errors.info}
                                        sx={{
                                            gridColumn: 'span 4',  // Span the entire width
                                            gridRow: '3',        // Below the first row
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
                                    </FormControl>
                                    <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />


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
                                            defaultValue=" "
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
                                        onClick={() => navigate('/home/enclosures')}
                                    >
                                        VIEW All ENCLOSURE
                                    </Button>

                                    <Button type="submit" color="secondary" variant="contained">
                                        UPDATE ENCLOSURE
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </>
        </>
    );
}

export default UpdateEnclosure;

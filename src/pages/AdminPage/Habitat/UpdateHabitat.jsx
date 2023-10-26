import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Formik } from 'formik';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as mockData from '~/api/animalsService';
import { updateHabitats } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

function UpdateHabitat() {
    //--------------- Call API GET USER ---------------------------------//'
    const { habitatId } = useParams();
    const [habitat, setHabitat] = useState({});
    const navigate = useNavigate();

    const fetchapi = async (id) => {
        const result = await mockData.getHabitatById(id);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(habitatId);
        res.then((result) => {
            setHabitat(result);
        });
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
        navigate('/habitat/view');
    };

    //---------------------------------------- Handle Submit----------------------------------/

    const handleFormSubmit = async (values, { resetForm }) => {
        // console.log("Before formatting:", values.createdDate);
        const inputDate = new Date(values.createdDate);
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
        values.createdDate = formattedDateTime;
        const res = updateHabitats(habitatId, values);
        // console.log("After formatting:", values.createdDate)
        res.then((result) => {
            const status = result.status;
            if (status === 200) {
                setOpen(true);
            }
        });
    };

    //********************************** INITIAL VALUE*********************************** */
    const initialValues = {
        name: habitat?.name || '',
        info: habitat?.info || '',
        imgUrl: habitat?.imgUrl || '',
        bannerUrl: habitat?.bannerUrl || '',
        status: habitat?.status ? 'True' : 'False',
    };

    //****************************** VALIDATION ********************************

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        info: yup.string().required('Information is required!'),
        imgUrl: yup.string().required('Image URL is required!'),
        bannerUrl: yup.string().required('Banner URL is required!'),
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
            <Box>
                <AdminHeader title="Update Habitat" subtitle="Update your Habitat" />
            </Box>

            <>
                <Box m="20px">
                    <Box mb="20px" display="flex" justifyContent="left">
                        <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            onClick={() => navigate('/home/habitats')}
                        >
                            VIEW ALL HABITAT
                        </Button>
                    </Box>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={userSchema}
                        enableReinitialize={true}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />
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
                                                        label="Created Date"
                                                    />
                                                )}
                                                name="createdDate"
                                                label="What is the habitat's created date?"
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

                                    {/* Info */}
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        multiline
                                        rows={3}
                                        label="Infomation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.info}
                                        name="info"
                                        error={!!touched.info && !!errors.info}
                                        helperText={touched.info && errors.info}
                                        sx={{
                                            gridColumn: 'span 4',
                                        }}
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
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Banner URL"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.bannerUrl}
                                        name="bannerUrl"
                                        error={!!touched.bannerUrl && !!errors.bannerUrl}
                                        helperText={touched.bannerUrl && errors.bannerUrl}
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
                                <Box display="flex" justifyContent="end" mt="20px">
                                    {/* <Link to="/edit/sercurity">
                                        <Button
                                            // onClick={handleSercurity}
                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                        >
                                            SERCURITY
                                        </Button>
                                    </Link> */}

                                    <Button type="submit" color="secondary" variant="contained">
                                        Update Habitat
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

export default UpdateHabitat;

import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as mockData from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

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
        navigate('/home/habitats');
    };

    //---------------------------------------- Handle Submit----------------------------------/

    const handleFormSubmit = async (values) => {
        try {
            if (values.imgUrl instanceof File) {
                const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
                values.imgUrl = imgURL;
            }
            if (values.bannerUrl instanceof File) {
                const bannerURL = await uploadFile(values.bannerUrl, 'update-habitats');
                values.bannerUrl = bannerURL;
            }
            const response = mockData.updateHabitats(habitatId, values);
            response.then((result) => {
                if (result.data.status === "Ok") {
                    setOpen(true);
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
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
                        <h2 id="parent-modal-title">Update Habitat Successfully!</h2>
                        <p id="parent-modal-description">Habitat have been update to DataBase!</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                <AdminHeader title="Update Habitat" subtitle="Update your Habitat" />
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
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{
                                            gridColumn: 'span 2',
                                        }}
                                    />
                                    {/* <FormControl
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
                                    </FormControl> */}

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
                                    <FormControl component="fieldset" >
                                        <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px', marginTop: "10px" }}>
                                            bannerUrl
                                        </Typography>
                                        <Input
                                            type="file"
                                            label="bannerUrl"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue('bannerUrl', e.currentTarget.files[0]);
                                            }}
                                            name="bannerUrl"
                                        />
                                        <img src={values.imgUrl} alt='' style={{ width: "150px", height: "70px" }} />
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
                                        onClick={handleClose}
                                    >
                                        VIEW habitats
                                    </Button>

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

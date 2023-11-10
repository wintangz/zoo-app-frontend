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

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as mockData from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

function HabitatsUpdate() {
    //--------------- Call API GET USER ---------------------------------//'
    const { habitatId } = useParams();
    const toast = useRef(null);
    const [habitat, setHabitat] = useState({});
    const navigate = useNavigate();
    const location = useLocation()

    const fetchapi = async (id) => {
        const result = await mockData.getHabitatById(id);
        return result;
    };
    useEffect(() => {
        console.log(location.state);
        setHabitat(location.state);
    }, []);

    //****************---------------------- Config Color Theme ****************************/
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);

    const handleClose = () => {
        navigate('/dashboard/habitats');
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
            const res = mockData.updateHabitats(location.state.id, values);
            console.log(res)
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Habitat Successfully', life: 3000 })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
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
            <Toast ref={toast} />
            <Box m="20px">
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
                                // display="grid"
                                // gap="30px"
                                // gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                >
                                    <div className="">
                                        <label className="font-bold block mb-2">Name</label>
                                        <InputText
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name="name"
                                            error={!!touched.name && !!errors.name}
                                            helperText={touched.name && errors.name}
                                            className='w-96'
                                        />
                                    </div>
                                    <div className='mt-10'>
                                        <label className="font-bold block mb-2" >Infomation</label>
                                        <InputTextarea
                                            rows={5}
                                            cols={130}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.info}
                                            name="info"
                                            error={!!touched.info && !!errors.info}
                                            helperText={touched.info && errors.info}
                                        />
                                    </div>
                                    <div className="flex flex-row space-x-20 mt-5 gap-20">
                                        <FormControl component="fieldset" >
                                            <label className="font-bold block">Image Url</label>
                                            <Input
                                                className='m-0'
                                                type="file"
                                                label="imgUrl"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    setFieldValue('imgUrl', e.currentTarget.files[0]);
                                                }}
                                                name="imgUrl"
                                                error={!!touched.imgUrl && !!errors.imgUrl}
                                            />
                                            {touched.imgUrl && errors.imgUrl && (
                                                <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                            )}
                                            <img src={values.imgUrl} className='w-40 h-20' />
                                        </FormControl>

                                        <FormControl component="fieldset" >
                                            <label className="font-bold block ">Banner Url</label>
                                            <Input
                                                className='m-0'
                                                type="file"
                                                label="bannerUrl"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    setFieldValue('bannerUrl', e.currentTarget.files[0]);
                                                }}
                                                name="bannerUrl"
                                                error={!!touched.bannerUrl && !!errors.bannerUrl}
                                            />
                                            {touched.bannerUrl && errors.bannerUrl && (
                                                <div style={{ color: 'red' }}>{errors.bannerUrl}</div>
                                            )}
                                            <img src={values.bannerUrl} className='w-40 h-20' />
                                        </FormControl>
                                        <FormControl
                                            component="fieldset"
                                        // width="75%"
                                        // sx={{
                                        //     gridColumn: 'span 1',
                                        // }}
                                        // label="Status"
                                        // style={{ marginLeft: '50px' }}
                                        >
                                            <label className="font-bold block ">Status</label>
                                            <RadioGroup
                                                aria-label="Status"
                                                name="status"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                defaultValue=" "
                                                value={values.status}
                                                sx={{ display: 'inline-block', fontSize: '1.3rem' }}
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
                                    </div>

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

export default HabitatsUpdate;

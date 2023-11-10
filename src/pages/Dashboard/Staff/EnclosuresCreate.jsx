import {
    Box,
    Button,
    FormControl,
    Input,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
// import uploadFile from '~/utils/transferFile';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { createEnclousures, getHabitats } from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';



function EnclosuresCreate() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [habitats, setHabitats] = useState([]);

    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            const filter = result.filter(habitats => {
                return habitats.status === true;
            })
            setHabitats(filter);
        });
    }, []);

    const [habitattId, setHabitatId] = useState([])

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }

    const handleFormSubmit = async (values) => {
        // values.createdDate = formattedDateTime(values.createdDate);
        try {
            const submitValue = {
                ...values,
                habitatId: habitattId,
            };
            const imgUrl = await uploadFile(submitValue.imgUrl, 'create-news');
            submitValue.imgUrl = imgUrl;
            console.log(submitValue);
            const response = await createEnclousures(submitValue);
            console.log(response);
            if (response.data.status === "Ok") {
                console.log(values);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create Enclosure Successfully', life: 3000 })
            } else if (response.status !== 200) {
                toast.current.show({ severity: 'error', summary: 'Error ' + response.status, detail: response.data.error, life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const initialValues = {
        name: '',
        maxCapacity: '',
        info: '',
        imgUrl: '',
        habitatId: '',
        status: true,
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name cannot be empty'),
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
        info: yup.string().required('Information cannot be empty'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        habitatId: yup.number(yup.string())
    });

    return (
        <>
            <Toast ref={toast} />
            <Box m="20px">
                <AdminHeader title="Create Enclosure" subtitle="Create a new Enclosure" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box className=''>
                                <div className="flex flex-row space-x-10">
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
                                    <div className="">
                                        <label className="font-bold block mb-2">Max Capacity</label>
                                        <InputText
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.maxCapacity}
                                            name="maxCapacity"
                                            error={!!touched.maxCapacity && !!errors.maxCapacity}
                                            helperText={touched.maxCapacity && errors.maxCapacity}
                                            className='w-96'
                                        />
                                    </div>
                                    <div >
                                        <label className="font-bold block mb-2" >Habitat</label>
                                        <TextField
                                            sx={{ width: '340px' }}
                                            select
                                            onBlur={handleBlur}
                                            onChange={handleChangeHabitatId}
                                            name="habitat"
                                            defaultValue={1}
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
                                    </div>
                                </div>




                                {/* Information */}
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
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="50px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/dashboard/enclosures')}
                                >
                                    VIEW All ENCLOSURE
                                </Button>
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

export default EnclosuresCreate;

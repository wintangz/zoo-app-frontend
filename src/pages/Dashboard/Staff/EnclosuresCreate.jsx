import {
    Box,
    FormControl,
    Input,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
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



    const [habitatId, setHabitatId] = useState([])

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }

    const handleFormSubmit = async (values) => {
        // values.createdDate = formattedDateTime(values.createdDate);
        try {
            const submitValue = {
                ...values,
                habitatId: habitatId,
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
        name: yup.string().required('Name is required!'),
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
        habitatId: yup.number(yup.string()),
    });

    console.log(habitatId);

    return (
        <>
            <Toast ref={toast} />
            <Box m="20px">
                <AdminHeader title="Create Enclosure" subtitle="Create a new Enclosure" />
                <Formik onSubmit={(values, { setValues }) => {
                    // Trim all values before submitting
                    const trimmedValues = Object.entries(values).reduce((acc, [key, value]) => {
                        acc[key] = typeof value === 'string' ? value.trim() : value;
                        return acc;
                    }, {});

                    handleFormSubmit(trimmedValues);
                    // Optionally, update the form state with trimmed values
                    setValues(trimmedValues);
                }}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
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
                                            className={`w-96 ${errors.name && touched.name ? 'p-invalid' : ''}`}
                                        />
                                        {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                                    </div>
                                    <div className="">
                                        <label className="font-bold block mb-2">Max Capacity</label>
                                        <InputText
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.maxCapacity}
                                            name="maxCapacity"
                                            className={`w-96 ${errors.maxCapacity && touched.maxCapacity ? 'p-invalid' : ''}`}
                                        />
                                        {errors.maxCapacity && touched.maxCapacity && <div style={{ color: 'red' }}>{errors.maxCapacity}</div>}
                                    </div>
                                    <div >
                                        <label className="font-bold block mb-2" >Habitat</label>
                                        <Dropdown
                                            style={{ width: '340px' }}
                                            // defaultValue={habitatId}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleChangeHabitatId({ target: { value: e.value } })}
                                            value={habitatId} // Assuming habitattId is the selected value
                                            options={habitats.map((option) => ({ label: option.name, value: option.id }))}
                                            placeholder="Select a Habitat"
                                            showClear
                                        />
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
                                        className={` ${errors.info && touched.info ? 'p-invalid' : ''}`}
                                    />
                                    {errors.info && touched.info && <div style={{ color: 'red' }}>{errors.info}</div>}
                                </div>
                                <FormControl component="fieldset" className='mt-5' >
                                    <label className="font-bold m-0 ">Image Url</label>
                                    <Input
                                        type="file"
                                        label="imgUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }}
                                        name="imgUrl"
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                        className='m-0'
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </FormControl>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="50px">
                                <Button
                                    type="button"
                                    label="View Enclosure"
                                    severity="info"
                                    raised
                                    onClick={() => navigate('/dashboard/enclosures')}
                                />

                                <Button
                                    type="submit"
                                    label="Create Enclosure"
                                    severity="success"
                                    raised
                                />
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default EnclosuresCreate;

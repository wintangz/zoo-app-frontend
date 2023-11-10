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
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createHabitats } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';
// import { DataGridPro } from '@mui/x-data-grid-pro';
function HabitatsCreate() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);



    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
            values.imgUrl = imgURL;
            const bannerURL = await uploadFile(values.bannerUrl, 'update-habitats');
            values.bannerUrl = bannerURL;
            const res = createHabitats(values);
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create Habitat Successfully', life: 3000 })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
                }
            });
        } catch (error) {
            console.error(error);

        }
    };

    const initialValues = {
        name: '',
        info: '',
        imgUrl: '',
        bannerUrl: '',
        status: true,
    };

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        info: yup.string().required('Information is required!'),
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
        bannerUrl: yup
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
    return (
        <>
            <Toast ref={toast} />
            <Box m="20px">
                <AdminHeader title="Create Habitat" subtitle="Create a new habitat" />
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
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
                                <div className="flex flex-row gap-20 mt-5">
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
                                    </FormControl>
                                </div>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt="50px">
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    onClick={() => navigate('/dashboard/habitats')}
                                >
                                    VIEW HABITATS
                                </Button>
                                <Button type="submit" color="secondary" variant="contained">
                                    CREATE HABITAT
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

export default HabitatsCreate;

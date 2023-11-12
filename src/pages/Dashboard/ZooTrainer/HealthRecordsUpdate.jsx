import {
    Input,
} from '@mui/material';

import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import uploadFile from "~/utils/transferFile";
import { updateHealthCare } from '~/api/healService';

const HealthRecordsUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [formKey, setFormKey] = useState(0);
    const [health, setHealth] = useState(null);
    const toast = useRef(null);

    const initialValues = {
        weight: health?.weight || '',
        height: health?.height || '',
        length: health?.length || '',
        temperature: health?.temperature || '',
        lifeStage: health?.lifeStage || '',
        diagnosis: health?.diagnosis || '',
        imgUrl: health?.imgUrl || '',
        animalId: health?.animal?.id || '',
    };


    const userSchema = yup.object().shape({
        weight: yup.number().required('required'),
        height: yup.number().required('required'),
        length: yup.number().required('required'),
        temperature: yup.number().required('required'),
        lifeStage: yup.string().required('required'),
        diagnosis: yup.string().required('required'),
        animalId: yup.string().required('required'),
        imgUrl: yup.string()
            .required('A file is required')
    });

    const labels = {
        title: 'Update Health Record',
        subtitle: 'Update a Health Record',
        apiPath: '/animals/health/update',
    }
    // const { data, mutate, isLoading } = useSWR(labels.apiPath, post);
    const handleFormSubmit = async (values) => {
        try {
            // values.animalName = null;
            delete values.animalName;
            if (values.imgUrl instanceof File) {
                values.imgUrl = await uploadFile(values.imgUrl, "health");
            }
            console.log(values);

            const response = await updateHealthCare(location.state.id, values);
            console.log(response);
            if (response.data.status === "Ok") {
                console.log(values);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Health Record Successfully', life: 3000 })
                setFormKey((prevKey) => prevKey + 1);
            } else if (response.status !== 200) {
                toast.current.show({ severity: 'error', summary: 'Error ' + response.status, detail: response.data.error, life: 3000 });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const animalId = location.state?.animal?.id;
    console.log(animalId);

    useEffect(() => {
        console.log(location.state);
        setHealth(location.state);
    }, []);

    console.log(health);
    return (
        <>
            <Toast ref={toast} />
            <div className="p-5">
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <Formik key={formKey} // Add key to trigger re-render
                    onSubmit={(values, { setValues }) => {
                        console.log("Form submitted");
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
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row space-x-10 mt-5">
                                {/* //Animal */}
                                <div >
                                    <label className="font-bold block mb-2">Animal</label>
                                    {health && (
                                        <InputText
                                            type="text"
                                            onBlur={handleBlur}
                                            value={health.animal.name}
                                            name="animalId"
                                            style={{ width: '550px' }}
                                            className={`w-96${errors.animalId && touched.animalId ? 'p-invalid' : ''}`}
                                        />
                                    )}
                                </div>

                                {/* Weight */}
                                <div className="">
                                    <label className="font-bold block mb-2">Weight</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.weight}
                                        name="weight"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.weight && touched.weight ? 'p-invalid' : ''}`}
                                    />
                                    {errors.weight && touched.weight && <div style={{ color: 'red' }}>{errors.weight}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Height</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.height}
                                        name="height"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.height && touched.height ? 'p-invalid' : ''}`}
                                    />
                                    {errors.height && touched.height && <div style={{ color: 'red' }}>{errors.height}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">Length</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.length}
                                        name="length"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.length && touched.length ? 'p-invalid' : ''}`}
                                    />
                                    {errors.length && touched.length && <div style={{ color: 'red' }}>{errors.length}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Temperature</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.temperature}
                                        name="temperature"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.temperature && touched.temperature ? 'p-invalid' : ''}`}
                                    />
                                    {errors.temperature && touched.temperature && <div style={{ color: 'red' }}>{errors.temperature}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block mb-2">Life Stage</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lifeStage}
                                        name="lifeStage"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.lifeStage && touched.lifeStage ? 'p-invalid' : ''}`}
                                    />
                                    {errors.lifeStage && touched.lifeStage && <div style={{ color: 'red' }}>{errors.lifeStage}</div>}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-10 mt-5">
                                <div className="">
                                    <label className="font-bold block mb-2">Diagnosis</label>
                                    <InputText
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.diagnosis}
                                        name="diagnosis"
                                        style={{ width: '550px' }}
                                        className={`w-96${errors.diagnosis && touched.diagnosis ? 'p-invalid' : ''}`}
                                    />
                                    {errors.diagnosis && touched.diagnosis && <div style={{ color: 'red' }}>{errors.diagnosis}</div>}
                                </div>
                                <div>
                                    <div className="">
                                        <label className="font-bold block">Image Url</label>
                                        <Input
                                            className='m-0 w-96'
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
                                        <img src={values.imgUrl} className='w-96 h-44 mt-3 rounded-md' />

                                    </div>
                                </div>

                            </div>




                            <div className='flex justify-between mt-12'>
                                <Button
                                    type="button"
                                    label="Back"
                                    severity="info"
                                    icon="pi pi-eye"
                                    raised
                                    className='w-28 h-14'
                                    onClick={() => navigate('/dashboard/animals/health')}
                                />
                                <Button
                                    type="submit"
                                    label="Update"
                                    icon="pi pi-check"
                                    severity="warning"
                                    className='w-32 h-14'
                                    raised
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default HealthRecordsUpdate;
import {
    Input,
} from '@mui/material';

import { Formik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import uploadFile from "~/utils/transferFile";
import { createHealthCare } from '~/api/healService';
import { getAllAnimals } from "~/api/animalsService";

const HealthRecordsCreate = () => {
    const [animals, setAnimals] = useState(null)
    const [animalsId, setAnimalsId] = useState(null)
    const navigate = useNavigate();
    const [formKey, setFormKey] = useState(0);
    const toast = useRef(null);

    const handleChangeAnimalId = (event) => {
        setAnimalsId(event.target.value)
    }

    const initialValues = {
        weight: '',
        height: '',
        length: '',
        temperature: '',
        lifeStage: '',
        diagnosis: '',
        imgUrl: '',
        animalId: '',
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
        title: 'Create Health Record',
        subtitle: 'Create new Health Record',
        apiPath: '/health_records'
    }
    // const { data, mutate, isLoading } = useSWR(labels.apiPath, post);
    const handleFormSubmit = async (values) => {
        console.log("Form values submitted to server:", values);

        try {
            const submitValue = {
                ...values,
                animalId: animalsId,
            };
            const imgUrl = await uploadFile(submitValue.imgUrl, "health");

            // Make sure to handle the file upload response appropriately

            submitValue.imgUrl = imgUrl;
            console.log(submitValue);
            const response = await createHealthCare(submitValue);
            console.log("API response:", response);
            console.log("API response:", submitValue);
            if (response.data.status === "Ok") {
                console.log(values);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create Enclosure Successfully', life: 3000 })
                setFormKey((prevKey) => prevKey + 1);
            } else if (response.status !== 200) {
                toast.current.show({ severity: 'error', summary: 'Error ' + response.status, detail: response.data.error, life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const res = getAllAnimals();
        res.then((result) => {
            const filter = result.filter(animals => animals.status === true);
            setAnimals(filter);

            // Set the default value dynamically based on the name of the first index
            const defaultAnimalId = filter.length > 0 ? filter[0].id : null;

            // Set the default value to the id of the first index if habitats array is not empty
            if (defaultAnimalId !== null) {
                setAnimalsId(defaultAnimalId);
            }
        });
    }, []);

    console.log(animalsId);
    console.log(animals);

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
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row space-x-10 mt-5">
                                {/* //Animal */}
                                <div >
                                    <label className="font-bold block mb-2">Animal</label>

                                    <Dropdown
                                        style={{ width: '550px' }}
                                        name='animalId'
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setAnimalsId(e.value);
                                        }}
                                        value={animalsId}
                                        options={(animals && animals.map) ? animals.map((option) => ({ label: option.name, value: option.id })) : []}
                                    />
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
                                        className={`${errors.weight && touched.weight ? 'p-invalid' : ''}`}
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
                                        className={`${errors.height && touched.height ? 'p-invalid' : ''}`}
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
                                        className={`${errors.length && touched.length ? 'p-invalid' : ''}`}
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
                                        className={`${errors.temperature && touched.temperature ? 'p-invalid' : ''}`}
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
                                        className={`${errors.lifeStage && touched.lifeStage ? 'p-invalid' : ''}`}
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
                                        className={`${errors.diagnosis && touched.diagnosis ? 'p-invalid' : ''}`}
                                    />
                                    {errors.diagnosis && touched.diagnosis && <div style={{ color: 'red' }}>{errors.diagnosis}</div>}
                                </div>
                                <div className="">
                                    <label className="font-bold block">Image Url</label>
                                    <Input
                                        className='m-0'
                                        type="file"
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
                                    label="Create"
                                    icon="pi pi-check"
                                    severity="success"
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

export default HealthRecordsCreate;
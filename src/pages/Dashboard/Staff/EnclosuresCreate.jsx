import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import * as yup from 'yup';
// import uploadFile from '~/utils/transferFile';
import { useNavigate } from 'react-router-dom';
import { createEnclousures, getHabitats } from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';

function EnclosuresCreate() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [formKey, setFormKey] = useState(0);
    const [habitats, setHabitats] = useState([]);

    // useEffect(() => {
    //     const res = getHabitats();
    //     res.then((result) => {
    //         const filter = result.filter(habitats => {
    //             return habitats.status === true;
    //         })
    //         setHabitats(filter);
    //     });
    // }, []);
    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            const filter = result.filter(habitat => habitat.status === true);
            setHabitats(filter);

            // Set the default value dynamically based on the name of the first index
            const defaultHabitatId = filter.length > 0 ? filter[0].id : null;

            // Set the default value to the id of the first index if habitats array is not empty
            if (defaultHabitatId !== null) {
                setHabitatId(defaultHabitatId);
            }
        });
    }, []);

    const labels = {
        title: 'Create Enclosure',
        subtitle: 'Create new Enclosure',
        apiPath: '/enclosures/create'
    }

    const [habitatId, setHabitatId] = useState([])

    const handleChangeHabitatId = (event) => {
        setHabitatId(event.target.value)
    }

    const handleFormSubmit = async (values) => {
        console.log(values)
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
                setFormKey((prevKey) => prevKey + 1);
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
        habitatId: '',
        status: "True",
    };
    const FILE_SIZE = 1920 * 1080;
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required!'),
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
        info: yup.string().required('Information cannot be empty'),
        imgUrl: yup.string().required('imgUrl cannot be empty'),
        habitatId: yup.number(yup.string()),
    });

    console.log(habitatId);
    console.log(habitats);
    return (
        <>
            <Toast ref={toast} />
            <div className='p-5'>
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <Formik key={formKey} // Add key to trigger re-render
                    onSubmit={(values, { setValues }) => {
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
                                        filter
                                        style={{ width: '340px' }}
                                        defaultValue={habitats.name === 1}
                                        name='habitatId'
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChangeHabitatId({ target: { value: e.value } })}
                                        value={habitatId} // Assuming habitattId is the selected value
                                        options={habitats.map((option) => ({ label: option.name, value: option.id }))}
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
                            <div className='mt-5'>
                                <div>
                                    <label className="font-bold block mb-2">Image Url</label>
                                    <div className="relative">
                                        <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                setFieldValue('imgUrl', e.currentTarget.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            name="imgUrl"
                                            id="imgUrlInput"
                                        />
                                        <label
                                            htmlFor="imgUrlInput"
                                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                        >
                                            Upload
                                        </label>
                                        <span className={`ml-2 ${values.imgUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                            {values.imgUrl ? 'File Uploaded' : 'No File chosen'}
                                        </span>
                                    </div>
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="mt-5">
                                    <label className="font-bold block ">Status</label>
                                    <div className='flex flex-wrap gap-5 mt-2'>
                                        <div className="flex align-items-center">
                                            <RadioButton
                                                inputId="statusTrue"
                                                name="status"
                                                value="True"
                                                onChange={handleChange}
                                                checked={values.status === 'True'}
                                            />
                                            <label htmlFor="StatusTrue" className="ml-2">True</label>
                                        </div>
                                        <div className="flex items-center">
                                            <RadioButton
                                                inputId="statusFalse"
                                                name="status"
                                                value="False"
                                                onChange={handleChange}
                                                checked={values.status === 'False'}
                                            />
                                            <label htmlFor="StatusTrue" className="ml-2">False</label>
                                        </div>
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
                                    onClick={() => navigate('/dashboard/enclosures')}
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
}

export default EnclosuresCreate;

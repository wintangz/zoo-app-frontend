import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { getHabitats } from '~/api/animalsService';
import { createSpecies } from '~/api/speciesService';
import uploadFile from '~/utils/transferFile';

const SpeciesCreate = () => {
    const [habitats, setHabitats] = useState([]);
    const [habitattId, setHabitatId] = useState([])
    const toast = useRef(null);
    const labels = {
        title: 'Species Management',
        subtitle: 'Table of species',
        apiPath: '/species'
    }
    const initialValues = {
        name: '',
        species: '',
        genus: '',
        family: '',
        habitatId: '',
        diet: '',
        conversationStatus: '',
        description: '',
        imgUrl: '',
        avatarUrl: '',
        status: true,

    };
    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            setHabitats(result);
        });
    }, []);

    const handleChangeHabitatId = (event) => {
        console.log(event.target.value.id);
        setHabitatId(event.target.value.id)
    }
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        species: yup.string().required('Species is required'),
        genus: yup.string().required('Genus is required'),
        family: yup.string().required('Family is required'),
        habitatId: yup.number(yup.string()),
        diet: yup.string().required('Diet is required'),
        conversationStatus: yup.string().required('Conservation Status is required'),
        description: yup.string().required('Description is required'),
        imgUrl: yup.mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        avatarUrl: yup.mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const submitValue = {
                    ...values,
                    habitatId: habitattId,
                };
                const imgURL = await uploadFile(submitValue.imgUrl, 'create-species');
                const avatarUrl = await uploadFile(submitValue.avatarUrl, 'create-species');
                submitValue.imgUrl = imgURL;
                submitValue.avatarUrl = avatarUrl;
                console.log(submitValue);
                const response = createSpecies(submitValue);
                console.log(response);
                response.then((result) => {
                    console.log(result);
                    if (result.status === 200) {
                        setHabitats([]);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create specie successfully', life: 3000 })
                        resetForm();
                    }
                    else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                    }
                });
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    return (
        <div className='p-5'>
            <Toast ref={toast} />
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>

            {/* {Object.keys(formik.errors).length > 0 && formik.touched && (
                <div style={{ color: 'red' }}>There are errors in the form. Please fix them.</div>
            )} */}
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="p-col-6">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.name}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="species">Species</label>
                    <InputText
                        id="species"
                        name="species"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.species}
                        className={formik.errors.species && formik.touched.species ? 'p-invalid' : ''}
                    />
                    {formik.errors.species && formik.touched.species && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.species}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="genus">Genus</label>
                    <InputText
                        id="genus"
                        name="genus"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.genus}
                        className={formik.errors.genus && formik.touched.genus ? 'p-invalid' : ''}
                    />
                    {formik.errors.genus && formik.touched.genus && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.genus}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="family">Family</label>
                    <InputText
                        id="family"
                        name="family"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.family}
                        className={formik.errors.family && formik.touched.family ? 'p-invalid' : ''}
                    />
                    {formik.errors.family && formik.touched.family && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.family}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="habitatId">Habitat</label>
                    <Dropdown
                        id="habitatId"
                        name="habitatId"
                        onBlur={formik.handleBlur}
                        onChange={handleChangeHabitatId}
                        value={habitats.find(habitat => habitat.id === habitattId)}
                        options={habitats}
                        optionLabel="name"
                        placeholder="Select a Habitat"
                        className={formik.errors.habitatId && formik.touched.habitatId ? 'p-invalid' : ''}
                    />
                    {formik.errors.habitatId && formik.touched.habitatId && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.habitatId}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="diet">Diet</label>
                    <InputText
                        id="diet"
                        name="diet"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.diet}
                        className={formik.errors.diet && formik.touched.diet ? 'p-invalid' : ''}
                    />
                    {formik.errors.diet && formik.touched.diet && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.diet}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="conversationStatus">Conservation Status</label>
                    <InputText
                        id="conversationStatus"
                        name="conversationStatus"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.conversationStatus}
                        className={formik.errors.conversationStatus && formik.touched.conversationStatus ? 'p-invalid' : ''}
                    />
                    {formik.errors.conversationStatus && formik.touched.conversationStatus && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.conversationStatus}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="description">Description</label>
                    <InputText
                        id="description"
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className={formik.errors.description && formik.touched.description ? 'p-invalid' : ''}
                    />
                    {formik.errors.description && formik.touched.description && (
                        <small className='text-red-500 font-bold'>
                            {formik.errors.description}
                        </small>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="imgUrl">Image File</label>
                    <input
                        type="file"
                        id="imgUrl"
                        name="imgUrl"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            formik.setFieldValue('imgUrl', e.currentTarget.files[0]);
                        }}
                    />
                    {formik.touched.imgUrl && formik.errors.imgUrl && (
                        <div style={{ color: 'red' }}>{formik.errors.imgUrl}</div>
                    )}
                </div>

                <div className="p-col-6">
                    <label htmlFor="avatarUrl">Avatar File</label>
                    <input
                        type="file"
                        id="avatarUrl"
                        name="avatarUrl"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            formik.setFieldValue('avatarUrl', e.currentTarget.files[0]);
                        }}
                    />
                    {formik.touched.avatarUrl && formik.errors.avatarUrl && (
                        <div style={{ color: 'red' }}>{formik.errors.avatarUrl}</div>
                    )}
                </div>
                <div className="p-field p-d-flex p-jc-space-between p-mt-4">
                    <Link to="/dashboard/species">
                        <Button
                            type="button"
                            label="View Species"
                            icon="pi pi-eye"
                        />
                    </Link>
                    <Button
                        type="submit"
                        label="Create Specie"
                        icon="pi pi-check"
                        className="p-button-success"
                    />
                </div>

            </form>
        </div>
    );
}

export default SpeciesCreate;

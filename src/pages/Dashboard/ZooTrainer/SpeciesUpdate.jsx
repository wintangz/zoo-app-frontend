import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getHabitats } from '~/api/animalsService';
import { getSpeciesById, updateSpecies } from '~/api/speciesService';
import uploadFile from '~/utils/transferFile';

const SpeciesUpdate = () => {
    const location = useLocation();
    const speciesId = location.state.id;
    const [species, setSpecies] = useState({});
    const navigate = useNavigate();
    const [habitats, setHabitats] = useState([]);
    const [habitattId, setHabitatId] = useState('');

    const fetchapi = async (id) => {
        const result = await getSpeciesById(id);
        return result;
    };

    useEffect(() => {
        const res = fetchapi(speciesId);
        res.then((result) => {
            setSpecies(result);
            setHabitatId(result.habitat.id || '');
            formik.setValues({
                name: result?.name || '',
                species: result?.species || '',
                genus: result?.genus || '',
                family: result?.family || '',
                habitatId: location.state.habitat.id,
                diet: result?.diet || '',
                conversationStatus: result?.conversationStatus || '',
                description: result?.description || '',
                imgUrl: result?.imgUrl || '',
                avatarUrl: result?.avatarUrl || '',
                status: result?.status ? 'True' : 'False',
            });

        });
        const response = getHabitats();
        response.then((result) => {
            setHabitats(result);
        });
    }, [speciesId]);
    const labels = {
        title: 'Species Management',
        subtitle: 'Table of species',
        apiPath: '/species'
    }
    const handleChangeHabitatId = (event) => {
        setHabitatId(event.value.id);
    };

    const initialValues = {
        name: species?.name || '',
        species: species?.species || '',
        genus: species?.genus || '',
        family: species?.family || '',
        habitatId: location.state.habitat.id,
        diet: species?.diet || '',
        conversationStatus: species?.conversationStatus || '',
        description: species?.description || '',
        imgUrl: species?.imgUrl || '',
        avatarUrl: species?.avatarUrl || '',
        status: species?.status ? 'True' : 'False',
    };


    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
        }
    };

    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        habitatId: yup.string().required('Habitat is required'),
        genus: yup.string().required('Genus is required'),
        family: yup.string().required('Family is required'),
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
                    console.log(value.size);
                    return value.size <= FILE_SIZE && SUPPORTED_FORMATS.includes(value.type);
                }
                return false;
            }),
        avatarUrl: yup
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

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const submitValue = { ...values, habitatId: habitattId };
                if (values.imgUrl instanceof File) {
                    const imgURL = await uploadFile(submitValue.imgUrl, 'update-species');
                    submitValue.imgUrl = imgURL;
                }
                if (values.avatarUrl instanceof File) {
                    const avatarURL = await uploadFile(submitValue.avatarUrl, 'update-species');
                    submitValue.avatarUrl = avatarURL;
                }
                const response = updateSpecies(speciesId, { ...submitValue });
                response.then((result) => {
                    if (result.data.status === 'Ok') {
                        handleCloseClick();
                    }
                });
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    const [close, setClose] = useState(false);
    const closeFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => navigate('/dashboard/species')} />
        </React.Fragment>
    );
    const handleCloseClick = () => {
        setClose(true)
    }

    return (
        <>
            <Dialog visible={close} style={{ width: '20rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                // header="Update Successfully"
                onHide={() => setClose(false)}
                footer={closeFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-check-circle mr-3 text-3xl text-green-400" />
                    <span className='font-bold text-green-400 text-xl'>
                        Update Successfully
                    </span>
                </div>
            </Dialog>
            <div className="p-5">
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-row space-x-10 mt-5">
                        <div className="">
                            <label className="font-bold block mb-2" htmlFor="name">Name</label>
                            <InputText
                                style={{ width: '550px' }}
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

                        <div  >
                            <label className="font-bold block mb-2" htmlFor="species">Species</label>
                            <InputText
                                style={{ width: '550px' }}
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
                    </div>
                    <div className="flex flex-row space-x-10 mt-5">
                        <div className="">
                            <label className="font-bold block mb-2" htmlFor="genus">Genus</label>
                            <InputText
                                style={{ width: '550px' }}
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

                        <div  >
                            <label className="font-bold block mb-2" htmlFor="family">Family</label>
                            <InputText
                                style={{ width: '550px' }}
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
                    </div>
                    <div className="flex flex-row space-x-10 mt-5">
                        <div className="flex flex-col">
                            <label className="font-bold block mb-2" htmlFor="habitatId">Habitat</label>
                            <Dropdown
                                filter
                                style={{ width: '550px' }}
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

                        <div className="flex flex-col">
                            <label className="font-bold block mb-2" htmlFor="diet">Diet</label>
                            <InputText
                                style={{ width: '550px' }}
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
                    </div>
                    <div className="flex flex-row space-x-10 mt-5">
                        <div  >
                            <label className="font-bold block mb-2" htmlFor="conversationStatus">Conservation Status</label>
                            <InputText
                                style={{ width: '550px' }}
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

                        <div  >
                            <label className="font-bold block mb-2" htmlFor="description">Description</label>
                            <InputText
                                style={{ width: '550px' }}
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
                    </div>
                    <div className="flex flex-row space-x-20 mt-5 gap-20">
                        <div  >
                            <label className="font-bold block mb-2" htmlFor="imgUrl">Image File</label>
                            <div className="relative">
                                <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        formik.setFieldValue('imgUrl', e.currentTarget.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                    name="imgUrl"
                                    id="imgUrl"
                                />
                                <label
                                    htmlFor="imgUrl"
                                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                >
                                    Upload
                                </label>
                                <span className={`ml-2 ${formik.values.imgUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                    {formik.values.imgUrl ? 'File Uploaded' : 'No File chosen'}
                                </span>
                            </div>
                            {formik.touched.imgUrl && formik.errors.imgUrl && (
                                <div style={{ color: 'red' }}>{formik.errors.imgUrl}</div>
                            )}
                            <img src={formik.values.imgUrl} className='w-96 h-44 mt-3 rounded-md' />
                        </div>

                        <div  >
                            <label className="font-bold block mb-2" htmlFor="imgUrl">Avatar File</label>
                            <div className="relative">
                                <AiOutlineCloudUpload className='top-2 left-5 absolute text-white text-2xl' />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        formik.setFieldValue('avatarUrl', e.currentTarget.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                    name="avatarUrl"
                                    id="avatarUrl"
                                />
                                <label
                                    htmlFor="avatarUrl"
                                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 pl-6 pr-4 rounded-md inline-block transition duration-300 font-bold"
                                >
                                    Upload
                                </label>
                                <span className={`ml-2 ${formik.values.avatarUrl ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`} id="fileName">
                                    {formik.values.avatarUrl ? 'File Uploaded' : 'No File chosen'}
                                </span>
                            </div>
                            {formik.touched.avatarUrl && formik.errors.avatarUrl && (
                                <div style={{ color: 'red' }}>{formik.errors.avatarUrl}</div>
                            )}
                            <img src={formik.values.avatarUrl} className='w-96 h-44 mt-3 rounded-md' />
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
                                        onChange={formik.handleChange}
                                        checked={formik.values.status === 'True'}
                                    />
                                    <label className="ml-2" htmlFor="statusTrue">True</label>
                                </div>
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        inputId="statusFalse"
                                        name="status"
                                        value="False"
                                        onChange={formik.handleChange}
                                        checked={formik.values.status === 'False'}
                                    />
                                    <label className="ml-2" htmlFor="statusFalse">False</label>
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
                            onClick={() => navigate('/dashboard/species')}
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
            </div>
        </>
    );
};

export default SpeciesUpdate;

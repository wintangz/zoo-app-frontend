import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { useEffect, useState } from 'react';
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
    const [open, setOpen] = useState(false);

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
                        setOpen(true);
                    }
                });
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
        navigate('/dashboard/species');
    };

    return (
        <>
            <div>
                <Dialog
                    header="Update Species Successfully!"
                    visible={open}
                    style={{ width: '400px' }}
                    onHide={handleClose}
                >
                    <p>New species have been updated to the Database!</p>
                    <Button
                        label="Close"
                        icon="pi pi-times"
                        onClick={handleClose}
                    />
                </Dialog>
            </div>
            <div className="p-5">
                <div className=''>
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-6">
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

                        <div className="p-col-12 p-md-6">
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
                                    {formik.errors.name}
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
                            />
                            {formik.errors.family && formik.touched.family && (
                                <small className='text-red-500 font-bold'>
                                    {formik.errors.family}
                                </small>
                            )}
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label htmlFor="habitatId">Habitat</label>
                            <Dropdown
                                id="habitatId"
                                name="habitatId"
                                onBlur={formik.handleBlur}
                                onChange={handleChangeHabitatId}
                                value={habitats.find(habitat => habitat.id === habitattId)}
                                defaultValue={location.state.habitat.id}
                                optionLabel="name"
                                options={habitats}
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
                                    handleFileChange(e);
                                    formik.setFieldValue('imgUrl', e.currentTarget.files[0]);
                                }}
                            />
                            {formik.touched.imgUrl && formik.errors.imgUrl && (
                                <div style={{ color: 'red' }}>{formik.errors.imgUrl}</div>
                            )}
                            {(formik.values.imgUrl || selectedFile) && (
                                <img
                                    src={formik.values.imgUrl === species.imgUrl ? formik.values.imgUrl : selectedFile}
                                    alt="Selected Image"
                                    style={{ width: '150px', height: '70px', marginTop: '10px' }}
                                />
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
                                    handleFileChange(e);
                                    formik.setFieldValue('avatarUrl', e.currentTarget.files[0]);
                                }}
                            />
                            {formik.touched.avatarUrl && formik.errors.avatarUrl && (
                                <div style={{ color: 'red' }}>{formik.errors.avatarUrl}</div>
                            )}
                            {(formik.values.avatarUrl || selectedFile) && (
                                <img
                                    src={formik.values.avatarUrl === species.avatarUrl ? formik.values.avatarUrl : selectedFile}
                                    alt="Selected Image"
                                    style={{ width: '150px', height: '70px', marginTop: '10px' }}
                                />
                            )}
                        </div>

                        <div className="p-col-12 p-md-6">
                            <label>Status</label>
                            <div className="p-formgroup-inline">
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        inputId="statusTrue"
                                        name="status"
                                        value="True"
                                        onChange={formik.handleChange}
                                        checked={formik.values.status === 'True'}
                                    />
                                    <label htmlFor="statusTrue">True</label>
                                </div>
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        inputId="statusFalse"
                                        name="status"
                                        value="False"
                                        onChange={formik.handleChange}
                                        checked={formik.values.status === 'False'}
                                    />
                                    <label htmlFor="statusFalse">False</label>
                                </div>
                            </div>
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
                                label="Update Species"
                                icon="pi pi-check"
                                className="p-button-success"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SpeciesUpdate;

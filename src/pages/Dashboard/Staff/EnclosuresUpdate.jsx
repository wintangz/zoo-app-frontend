import {
    Box,
    FormControl,
    FormControlLabel,
    Input,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getHabitats, updateEnclosures } from '~/api/animalsService';
import { getSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import uploadFile from '~/utils/transferFile';

function EnclosuresUpdate() {
    //--------------- Call API GET USER ---------------------------------//'
    const location = useLocation()
    const toast = useRef(null);
    const { enclosureId } = useParams();
    const [enclosure, setEnclosure] = useState({});
    const navigate = useNavigate();
    const [species, setSpecies] = useState([]);
    const [habitats, setHabitats] = useState([]);


    useEffect(() => {
        console.log(location.state);
        setEnclosure(location.state);
    }, []);

    //****************---------------------- Config Color Theme ****************************/
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);

    //---------------------------------------- Handle Submit----------------------------------/

    const handleFormSubmit = async (values) => {
        if (values.imgUrl instanceof File) {
            const imgURL = await uploadFile(values.imgUrl, 'update-news');
            values.imgUrl = imgURL;
        }
        console.log(location.state)
        console.log(values)
        const res = updateEnclosures(location.state.id, values);
        console.log(res)
        res.then((result) => {
            console.log(result);
            const status = result.status;
            if (status === 200) {
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update Enclosure Successfully', life: 3000 })
            } else {
                toast.current.show({ severity: 'error', summary: 'Error ' + result.status, detail: result.data.error, life: 3000 });
            }
        });
    };

    //********************************** INITIAL VALUE*********************************** */
    const initialValues = {
        name: enclosure?.name || '',
        maxCapacity: enclosure?.maxCapacity || '',
        info: enclosure?.info || '',
        imgUrl: enclosure?.imgUrl || '',
        status: enclosure?.status ? 'True' : 'False',

    };
    const habitatId = location.state?.habitat?.id;

    //****************************** VALIDATION ********************************
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        maxCapacity: yup
            .number()
            .typeError('Max Capacity must be a number')
            .min(1, 'Max Capacity must be greater than 0')
            .required('Max Capacity cannot be empty'),
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
    });

    useEffect(() => {
        const res = getSpecies();
        res.then((result) => {
            console.log(result);
            const filter = result.filter(speice => {
                return speice.status === true;
            })
            setSpecies(result);
        });
    }, []);

    useEffect(() => {
        const res = getHabitats();
        res.then((result) => {
            const filter = result.filter(habitats => {
                return habitats.status === true;
            })
            setHabitats(filter);
        });
    }, []);
    console.log(habitatId);
    return (
        <>
            <Toast ref={toast} />
            <Box m="30px">
                <AdminHeader title="Update Enclosure" subtitle="Update your Enclosure" />
            </Box>

            <>
                <Box m="20px">
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
                        enableReinitialize={true}
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
                                                defaultValue={values.habitatId}
                                                onBlur={handleBlur}
                                                onChange={(e) => setFieldValue('habitatId', e.value)}
                                                value={values.habitatId || habitatId}
                                                options={habitats.map((option) => ({ label: option.name, value: option.id }))}
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
                                    <div className="flex flex-row mt-5 ">
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



                                    </div>
                                    <FormControl
                                        component="fieldset"
                                    // width="75%"
                                    // sx={{
                                    //     gridColumn: 'span 1',
                                    // }}
                                    // label="Status"
                                    // style={{ marginLeft: '50px' }}
                                    >
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
                                    </FormControl>

                                </Box>
                                <Box display="flex" justifyContent="space-between" mt="50px" >
                                    <Button
                                        type="button"
                                        label="View Enclosure"
                                        severity="info"
                                        raised
                                        onClick={() => navigate('/dashboard/enclosures')}
                                    />

                                    <Button
                                        type="submit"
                                        label="Update Enclosure"
                                        severity="warning"
                                        raised
                                    />
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </>
        </>
    );
}

export default EnclosuresUpdate;

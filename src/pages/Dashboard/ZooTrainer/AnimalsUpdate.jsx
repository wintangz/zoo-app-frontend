import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { InputText } from 'primereact/inputtext';
import * as yup from 'yup';
import { createAnimals, updateAnimal } from '~/api/animalsService';
import uploadFile, { urlToFile } from '~/utils/transferFile';
import useSWR from 'swr'
import { get } from '../AxiosClient'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { Image } from 'primereact/image';
import { useState } from 'react';
const AnimalsUpdate = () => {
    const location = useLocation();
    const toast = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const labels = {
        title: 'Animal Management',
        subtitle: 'Create Animal',
        apiPath: '/species'
    }
    const sexRadio = [
        {
            id: 'sex',
            name: 'Male',
            value: true,
            inputId: 'sex',
        },
        {
            id: 'sex',
            name: 'Female',
            value: false,
            inputId: 'sex',
        },
    ]
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)
    const initialValues = {
        name: location.state.name,
        sex: location.state.sex,
        imgUrl: location.state.imgUrl,
        arrivalDate: new Date(location.state.arrivalDate),
        dateOfBirth: new Date(location.state.dateOfBirth),
        origin: location.state.origin,
        species: location.state.species,
        status: location.state.status,
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        sex: yup.string().required('Sex is required'),
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
        arrivalDate: yup.date().required('Arrival is required'),
        dateOfBirth: yup.date().required('Date of birth is required'),
        origin: yup.string().required('Origin is required'),
        species: yup.string().required('Species is required'),
        status: yup.string().required('required'),
    });
    console.log(location.state)
    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DDThh:mm:ss")
                values.arrivalDate = moment(values.arrivalDate).format("YYYY-MM-DDThh:mm:ss")
                if (values.imgUrl instanceof File) {
                    const imgURL = await uploadFile(values.imgUrl, 'update-habitats');
                    values.imgUrl = imgURL;
                }
                const res = updateAnimal(location.state.id, values)
                res.then((result) => {
                    console.log(result)
                    if (result.status === 200) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Update food successfully', life: 3000 })
                    }
                })

            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error text-red-500 font-bold">{formik.errors[name]}</small> : <small className="p-error text-red-500 font-bold">&nbsp;</small>;
    };


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

    const icon = (<i className="pi pi-check"></i>)

    return (
        <div className="p-5 w-[80vw]">
            <Toast ref={toast} />
            <div className="p-m-5 w-[100%]">
                <div >
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className='p-field w-[30%]'>
                        <label>Animal Name</label>
                        <InputText
                            className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
                            value={formik.values.name}
                            id="name"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} />
                        {formik.errors.name && formik.touched.name && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.name}
                            </small>
                        )}
                    </div>

                    <div className='p-field w-[30%] mt-2'>
                        <label>Species</label>
                        <Dropdown
                            inputId='species'
                            name='species'
                            value={formik.values.species}
                            options={data?.data}
                            optionLabel='name'
                            optionValue='name'
                            placeholder='Select species'
                            onChange={(e) => {
                                formik.setFieldValue('species', e.value);
                            }}
                        />
                        {getFormErrorMessage('species')}
                    </div>

                    <div className='flex'>
                        <div className='p-field w-[30%] mt-2 mr-4'>
                            <label>Day Of Birth</label>
                            <Calendar
                                showTime hourFormat="24" showIcon
                                inputId='dateOfBirth'
                                name='dateOfBirth'
                                value={formik.values.dateOfBirth}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('dateOfBirth') })}
                                onChange={(e) => {
                                    formik.setFieldValue('dateOfBirth', e.target.value);
                                }}
                            />
                            {getFormErrorMessage('dateOfBirth')}
                        </div>

                        <div className='p-field w-[30%] mt-2'>
                            <label>Arrival Date</label>
                            <Calendar
                                showTime hourFormat="24" showIcon
                                inputId='arrivalDate'
                                name='arrivalDate'
                                value={formik.values.arrivalDate}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('arrivalDate') })}
                                onChange={(e) => {
                                    formik.setFieldValue('arrivalDate', e.target.value);
                                }}
                            />
                            {getFormErrorMessage('arrivalDate')}
                        </div>
                    </div>

                    <div className='p-field w-[30%] mt-2'>
                        <label>Sex</label>
                        <div className="flex mt-1">
                            <Toast ref={toast} />
                            {sexRadio.map((btn, i) => {
                                return (
                                    <div key={i} className="flex align-items-center mr-3">
                                        <RadioButton
                                            {...btn}
                                            checked={formik.values.sex === btn.value}
                                            onChange={(e) => {
                                                formik.setFieldValue('sex', e.value);
                                            }}
                                        />
                                        <label htmlFor={btn.inputId} className="ml-1">
                                            {btn.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        {getFormErrorMessage('sex')}
                    </div>

                    <div className='p-field w-[30%]'>
                        <label>Origin</label>
                        <InputText
                            className={formik.errors.origin && formik.touched.origin ? 'p-invalid' : ''}
                            value={formik.values.origin}
                            id="origin"
                            name="origin"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} />
                        {formik.errors.origin && formik.touched.origin && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.origin}
                            </small>
                        )}
                    </div>
                    <div className="card mt-4 inline-flex flex-column ">
                        <input type='file'
                            onChange={(e) => {
                                handleFileChange(e)
                                formik.setFieldValue('imgUrl', e.currentTarget.files[0]);
                            }} name='imgUrl' id='imgUrl' />
                        {formik.errors.imgUrl && formik.touched.imgUrl && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.imgUrl}
                            </small>
                        )}
                        <Image className='inline' src={formik.values.imgUrl === location.state.imgUrl ? formik.values.imgUrl : selectedFile} indicatorIcon={icon} alt="Image" preview width="270" />
                    </div>
                    <Button className='mt-4' label='Update Animal' type="submit" />
                </form>
            </div>
        </div>
    )
}

export default AnimalsUpdate
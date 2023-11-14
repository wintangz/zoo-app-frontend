import { useFormik } from 'formik';
import moment from 'moment/moment';
import { InputText } from 'primereact/inputtext';
import * as yup from 'yup';
import { createAnimals } from '~/api/animalsService';
import uploadFile from '~/utils/transferFile';
import useSWR from 'swr'
import { get } from '../AxiosClient'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AnimalsCreate() {
    const toast = useRef(null);
    const [deleteModal, openDeleteModal] = useState(false);
    const navigate = useNavigate()
    const [createdAnimal, setCreatedAnimal] = useState(null);
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
        name: '',
        sex: true,
        imgUrl: '',
        arrivalDate: null,
        dateOfBirth: null,
        origin: '',
        species: null,
        status: true,
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        sex: yup.string().required('Sex is required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => {
                return value && value.size <= FILE_SIZE
            })
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        arrivalDate: yup.date().required('Arrival is required'),
        dateOfBirth: yup.date().required('Date of birth is required'),
        origin: yup.string().required('Origin is required'),
        species: yup.number().required('Species is required'),
        status: yup.string().required('required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                values.dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DDThh:mm:ss")
                values.arrivalDate = moment(values.arrivalDate).format("YYYY-MM-DDThh:mm:ss")
                values.imgUrl = await uploadFile(values.imgUrl, 'animals-individual');

                const res = createAnimals(values)
                res.then((result) => {
                    if (result.status === 200) {
                        setCreatedAnimal(result.data.data)
                        openDeleteModal(true)
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create animal successfully', life: 3000 })
                        resetForm();
                    }
                })

                console.log(values);

            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error text-red-500 font-bold">{formik.errors[name]}</small> : <small className="p-error text-red-500 font-bold">&nbsp;</small>;
    };


    const handleFileUpload = (event) => {
        formik.values.imgUrl = event.files[0];
        console.log(event.files[0]);
    };

    const deleteModalFooter = (
        <div>
            <Button label="Close" icon="pi pi-times" outlined onClick={() => openDeleteModal(false)} />
        </div>
    );

    return (

        <div className="p-5 w-[80vw]">

            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Actions"
                onHide={() => openDeleteModal(false)}
                footer={deleteModalFooter}>
                <div className="confirmation-content">
                    <span className=' flex items-center justify-evenly'>
                        Do you want to move this animal to an enclosure?<Link to='/dashboard/animals/movein' state={createdAnimal}><Button icon='pi pi-home' className='border-green-500 text-green-500' rounded outlined /></Link>
                    </span>
                    <span className=' flex items-center justify-evenly mt-2'>
                        Do you want to assign this animal to zoo trainer(s)?<Link to="/dashboard/animals/assign"><Button icon='pi pi-user-edit' className='border-pink-500 text-pink-500' rounded outlined />  </Link>
                    </span>
                </div>
            </Dialog>

            <div className="p-m-5 w-[100%]">
                <div >
                    <p className='text-3xl font-bold'>{labels.title}</p>
                    <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className='flex space-x-10 mt-5'>
                        <div className='p-field w-[30%]'>
                            <label className='font-bold block mb-2'>Animal Name</label>
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

                        <div className='p-field w-[30%]'>
                            <label className='font-bold block mb-2'>Species</label>
                            <Dropdown
                                filter
                                inputId='species'
                                name='species'
                                value={formik.values.species ? formik.values.species : data?.data.filter(data => data.status === true)[0].id}
                                options={data?.data.filter(data => data.status === true)}
                                optionLabel='name'
                                optionValue='id'
                                placeholder='Select species'
                                onChange={(e) => {
                                    formik.setFieldValue('species', e.value);
                                }}
                            />
                            {getFormErrorMessage('species')}
                        </div>
                    </div>

                    <div className='flex space-x-10'>
                        <div className='p-field w-[30%] mt-2'>
                            <label className='font-bold block mb-2'>Day Of Birth</label>
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
                            <label className='font-bold block mb-2'>Arrival Date</label>
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

                    <div className='flex space-x-10 '>
                        <div className='p-field w-[30%]'>
                            <label className='font-bold block mb-2'>Origin</label>
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


                        <div className='p-field w-[30%] mt-2'>
                            <label className='font-bold block mb-2'>Sex</label>
                            <div className="flex mt-1 items-center">
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
                                            <label className='block ml-1' htmlFor={btn.inputId}>
                                                {btn.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            {getFormErrorMessage('sex')}
                        </div>

                    </div>

                    <div className="card mt-4">
                        <label className='font-bold block mb-2'>Animal Image</label>
                        <FileUpload
                            name="imgUrl"
                            accept="image/*"
                            uploadOptions={{ className: 'hidden' }}
                            maxFileSize={1000000}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                            onSelect={handleFileUpload}
                        />
                        {formik.errors.imgUrl && formik.touched.imgUrl && (
                            <small className='text-red-500 font-bold'>
                                {formik.errors.imgUrl}
                            </small>
                        )}
                    </div>
                    <div className='flex justify-between mt-12'>
                        <Button
                            type="button"
                            label="Back"
                            severity="info"
                            icon="pi pi-eye"
                            raised
                            className='w-28 h-14'
                            onClick={() => navigate('/dashboard/animals')}
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
            </div>
        </div>
    )
}

export default AnimalsCreate;

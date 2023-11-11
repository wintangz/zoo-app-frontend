
import { Formik, useFormik } from 'formik';
import moment from 'moment/moment';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createAnimals } from '~/api/animalsService';
import { getSpecies } from '~/api/speciesService';
import { formatDateTimeSubmit } from '~/utils/dateTimeFormat';
import uploadFile from '~/utils/transferFile';
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get, remove } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode } from 'primereact/api';
import { useRef } from 'react';
import { Input } from 'antd';
// import { DataGridPro } from '@mui/x-data-grid-pro';
function AnimalsCreate() {
    const [deleteModal, openDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const toast = useRef(null);

    const labels = {
        title: 'Animal Management',
        subtitle: 'Create Animal',
        apiPath: '/species'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)
    data && console.log(data.data)

    const initialValues = {
        name: '',
        sex: true,
        imgUrl: '',
        arrivalDate: null,
        dateOfBirth: null,
        origin: '',
        species: '',
        status: true,
    };
    const FILE_SIZE = 1920 * 1080;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const userSchema = yup.object().shape({
        name: yup.string().required('required'),
        sex: yup.string().required('required'),
        imgUrl: yup
            .mixed()
            .required('A file is required')
            .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value) => value && SUPPORTED_FORMATS.includes(value.type)),
        arrivalDate: yup.date().required('required'),
        dateOfBirth: yup.date().required('required'),
        origin: yup.string().required('required'),
        species: yup.string().required('required'),
        status: yup.string().required('required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // values.quantity = parseInt(values.quantity);
                // // const response = await createFood({ ...values });
                // if (response.status === 200) {
                //     setFoods(true);
                //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Create food successfully', life: 3000 })
                //     resetForm();
                // } else {
                //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occurred', life: 3000 })
                // }
            } catch (error) {
                console.error('Error submitting form:', error.message);
            }
        },
    });
    return (
        <div className="p-5 w-[80vw]">
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
                </form>
            </div>
        </div>
    )
}

export default AnimalsCreate;

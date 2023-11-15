import {
    FormControl,
    Typography,
    useTheme,
    Input,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import WebcamCapture from './WebcamCapture';
import uploadFile from '~/utils/transferFile';
import { useLocation, useNavigate } from 'react-router-dom';
import { conFirm } from '~/api/animalsService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function Confirm() {
    const location = useLocation()
    console.log(location.state);
    const navigate = useNavigate()
    const [camera, setCamera] = useState(false);
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        navigate('/home/animals/schedule')
    };
    const [webcam, setWebcam] = useState({});
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.grey[500],
        border: '2px solid #000',
        color: colors.grey[100],
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

    const initialValues = {
        imgUrl: '',
        // actualQuantity: null,
        actualQuantities: location.state.details.reduce((acc, detail) => {
            acc[detail.id] = null;
            return acc;
        }, {}),
    };
    const userSchema = yup.object().shape({
        imgUrl: yup
            .mixed()
            .test('required', 'Image File is required', function (value) {
                // Check if the webcam is not active and the field is empty
                if (!camera && !value) {
                    return false;
                }
                return true;
            }),
        // actualQuantity: yup.number().required("Quantity is required").min(1, 'Actual Quantity must be at least 1'),
        actualQuantities: yup.object().shape(
            location.state.details.reduce((acc, detail) => {
                acc[detail.id] = yup.number().required("Quantity is required").min(1, 'Actual Quantity must be at least 1');
                return acc;
            }, {})
        ),
    });



    const handleFormSubmit = (values) => {
        const details = [];
        console.log(values);
        let res = null;
        if (typeof (webcam.imgUrl) == "undefined") {
            res = uploadFile(values.imgUrl, "confirm");
        } else {
            res = uploadFile(webcam.imgUrl, "confirm");
        }
        if (res) {
            res.then((result) => {
                const promises = Object.entries(values.actualQuantities).map(([detailId, quantity]) => {
                    const detail = location.state.details.find(d => d.id === parseInt(detailId));
                    if (!detail) {
                        throw new Error(`Detail with ID ${detailId} not found.`);
                    }
                    const data = {
                        id: detail.id,
                        imgUrl: result,
                        actualQuantity: parseInt(quantity),
                    };
                    details.push(data);
                })
            })
        }
        console.log(details);
        const response = conFirm(location.state.id, details);
        response.then((result) => {
            console.log(response);
            console.log(result);
        })
    }
    const labels = {
        title: 'Feeding Schedule Management',
        subtitle: 'Feeding Schedule Confirmation',
        // apiPath: `/feeding_schedules/zoo-trainers/${trainerId}`,
    }
    return (
        <div className='w-[80vw] p-5'>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            <div>
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <div
                                className='flex gap-8 flex-col'>
                                <div component="fieldset block">
                                    <h2 variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                        Image File
                                    </h2>
                                    <Input
                                        type="file"
                                        label="ImgUrl"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('imgUrl', e.currentTarget.files[0]);
                                        }} // Handle file input change
                                        name="imgUrl"
                                        error={!!touched.imgUrl && !!errors.imgUrl}
                                    />
                                    {touched.imgUrl && errors.imgUrl && (
                                        <div style={{ color: 'red' }}>{errors.imgUrl}</div>
                                    )}
                                </div>
                                <Button type='button' className='h-[50%] w-[15%] float-left' onClick={() => {
                                    setCamera(true)
                                }} >
                                    Get photo from your Camera
                                </Button>
                                {camera && <Button className='text-white bold h-[50%] w-[15%] float-left justify-center mt-4' onClick={() => {
                                    setCamera(false)
                                }}>
                                    Close Camera
                                </Button>}


                            </div>
                            {location.state.details.map((detail) => {
                                return (
                                    <div key={detail.id}>
                                        {touched.actualQuantities && touched.actualQuantities[detail.id] && errors.actualQuantities && errors.actualQuantities[detail.id] && (
                                            <div style={{ color: 'red' }}>{errors.actualQuantities[detail.id]}</div>
                                        )}
                                        <div className="card flex flex-column md:flex-row gap-3 mt-2">
                                            <lable></lable>
                                            <div className="p-inputgroup flex-1">
                                                <span className="p-inputgroup-addon">
                                                    Food Name
                                                </span>
                                                <InputText value={detail.food.name} />
                                            </div>

                                            <div className="p-inputgroup flex-1">
                                                <span className="p-inputgroup-addon">Expected Quantity</span>
                                                <InputText value={detail.expectedQuantity} />
                                            </div>

                                            <div className='flex flex-column'>
                                                <div className="p-inputgroup flex-1">
                                                    <span className="p-inputgroup-addon">Actual Quantity</span>
                                                    <InputText
                                                        // value={values.actualQuantity}
                                                        value={values.actualQuantities[detail.id]}
                                                        name={`actualQuantities[${detail.id}]`}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                )
                            })}
                            <div className='flex justify-end mt-4 mr-4' mt="20px" mr="20px">
                                <Button className='text-white bold' type="submit" color="secondary" variant="contained">
                                    CONFIRM
                                </Button>
                            </div>

                        </form>
                    )}
                </Formik>
                {camera && <WebcamCapture setWebcam={setWebcam} />}
            </div>
        </div>
    );
}

export default Confirm;
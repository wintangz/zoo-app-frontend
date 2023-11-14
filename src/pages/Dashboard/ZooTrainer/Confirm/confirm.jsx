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


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function Confirm() {
    const location = useLocation().state
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
    });



    const handleFormSubmit = (values) => {
        let res = null;

        if (typeof (webcam.imgUrl) == "undefined") {
            res = uploadFile(values.imgUrl, "confirm");
        } else {
            res = uploadFile(webcam.imgUrl, "confirm");
        }
        if (res) {
            res.then((result) => {
                const confirmationImgUrl = {
                    confirmationImgUrl: result
                }
                const response = conFirm(location.id, confirmationImgUrl);
                console.log(response)
                response.then((r) => {
                    console.log(r.status);
                    if (r.status === "Ok") {
                        setOpen(true);
                    }
                })
            })
        }

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
                                {camera && <Button className='text-white bold h-[50%] w-[15%] float-left justify-center' onClick={() => {
                                    setCamera(false)
                                }}>
                                    Close Camera
                                </Button>}
                            </div>

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
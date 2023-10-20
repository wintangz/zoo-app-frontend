import {
    Box,
    Button,
    FormControl,
    Typography,
    useTheme,
    Input,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';
import WebcamCapture from './WebcamCapture';
import uploadFile from '~/utils/transferFile';
import { useLocation } from 'react-router-dom';
import { conFirm } from '~/api/animalsService';


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

function Confirm() {
    const location = useLocation().state
    console.log(location);
    const [camera, setCamera] = useState(false);
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
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
            res = uploadFile(values, "confirm");
        } else {
            res = uploadFile(webcam, "confirm");
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
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Confirm Succesful</h2>
                        <p id="parent-modal-description">You have update your confirm</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <AdminHeader title="CONFIRM FEEDING" subtitle="Take a photo to check" />
            <Box>
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="inline-flex"
                                gap="30px"
                                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                sx={{
                                    '& > div': { gridColumn: 'span 4' },
                                    margin: '30px',
                                    flexDirection: 'column'
                                }}
                            >
                                <FormControl component="fieldset">
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ width: '100px' }}>
                                        Image File
                                    </Typography>
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
                                </FormControl>
                                <Button color="secondary" variant="contained" onClick={() => {
                                    setCamera(true)
                                }} sx={{ width: "100%", height: "50%", float: "right" }}>
                                    Get photo from your Camera
                                </Button>
                                {camera && <Button color="secondary" variant="contained" onClick={() => {
                                    setCamera(false)
                                }}>
                                    Close Camera
                                </Button>}
                            </Box>

                            <Box display="flex" justifyContent="end" mt="20px" mr="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    CONFIRM
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
                {camera && <WebcamCapture setWebcam={setWebcam} />}
            </Box>
        </>
    );
}

export default Confirm;
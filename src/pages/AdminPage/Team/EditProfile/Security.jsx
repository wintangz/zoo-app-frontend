import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Security } from '~/api/authService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

function SecurityProfile() {
    //****************---------------------- Config Color Theme ****************************/
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);

    // ******************************** MODAL FUNCTION ********************************/
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
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('token');
        window.location = ('/');
    };

    const passwordSchema = yup.object().shape({
        oldPassword: yup.string().required('required').min(8, 'Password must be at least 8 characters'),
        newPassword: yup.string().required('required').min(8, 'Password must be at least 8 characters'),
        confirm: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const [responseMessage, setResponseMessage] = useState('');
    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            if (values.newPassword === values.confirm) {
                const data = {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                };

                const response = await Security(data);
                console.log(response);
                console.log(data);
                if (response.status === "Ok") {
                    setOpen(true);
                    resetForm();
                } else {
                    setResponseMessage(response.data.data);
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };
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
                        <h2 id="parent-modal-title">Change Password Successful!</h2>
                        <p id="parent-modal-description">Your password has been updated.</p>
                        <Button color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <>

                <Box m="20px">
                    <Box>
                        <AdminHeader title="Change Password" subtitle="Change your Password" />
                    </Box>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirm: '',
                        }}
                        validationSchema={passwordSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Current Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.oldPassword}
                                    name="oldPassword"
                                    error={!!touched.oldPassword && !!errors.oldPassword}
                                    helperText={touched.oldPassword && errors.oldPassword}
                                    style={{ marginBottom: '10px' }}
                                />
                                <Typography color="red">{responseMessage}</Typography>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="New Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.newPassword}
                                    name="newPassword"
                                    error={!!touched.newPassword && !!errors.newPassword}
                                    helperText={touched.newPassword && errors.newPassword}
                                    style={{ marginBottom: '20px', marginTop: '10px' }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Confirm New Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirm}
                                    name="confirm"
                                    error={!!touched.confirm && !!errors.confirm}
                                    helperText={touched.confirm && errors.confirm}
                                    style={{ marginBottom: '20px' }}
                                />
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Link to="/home/settings/profile">
                                        <Button type="button" variant="contained" color="secondary">
                                            BACK
                                        </Button>
                                    </Link>

                                    <Button type="button" variant="contained" color="secondary">
                                        CHANGE PASSWORD
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </>
        </>
    );
}

export default SecurityProfile;

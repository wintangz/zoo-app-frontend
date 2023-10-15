import React from 'react';
import { Box, Button, TextField, useTheme, Typography } from '@mui/material';
import { Formik } from 'formik';
import Modal from '@mui/material/Modal';
import * as yup from 'yup';
import { tokens } from '~/theme';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import * as mockData from '~/api/data/mockData'; // Assuming there's a function for updating the password
import { Link } from 'react-router-dom';

function Sercurity() {
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
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    //---------------------------------------- Handle Submit----------------------------------/
    // const handleFormSubmit = async (values, { resetForm }) => {
    //     const res = updatePassword(values); // You need to implement the updatePassword function
    //     res.then((result) => {
    //         const status = result.status;
    //         if (status === 200) {
    //             setOpen(true);
    //             resetForm();
    //         }
    //     });
    // };

    //****************************** VALIDATION ********************************
    const passwordSchema = yup.object().shape({
        currentPassword: yup.string().required('required'),
        newPassword: yup.string().required('required').min(8, 'Password must be at least 8 characters'),
        retypeNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    });

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
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                <AdminHeader title="Change Password" subtitle="Change your password" />
            </Box>

            <>
                <Box m="20px">
                    <Formik
                        // onSubmit={handleFormSubmit}
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            retypeNewPassword: '',
                        }}
                        validationSchema={passwordSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Current Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.currentPassword}
                                    name="currentPassword"
                                    error={!!touched.currentPassword && !!errors.currentPassword}
                                    helperText={touched.currentPassword && errors.currentPassword}
                                />

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
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Retype New Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.retypeNewPassword}
                                    name="retypeNewPassword"
                                    error={!!touched.retypeNewPassword && !!errors.retypeNewPassword}
                                    helperText={touched.retypeNewPassword && errors.retypeNewPassword}
                                />

                                <Box display="flex" justifyContent="space-between" mt="20px">
                                    <Link to="/edit">
                                        <Button type="button" color="secondary" variant="contained">
                                            BACK
                                        </Button>
                                    </Link>

                                    <Button type="submit" color="secondary" variant="contained">
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

export default Sercurity;

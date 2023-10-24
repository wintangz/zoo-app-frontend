import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { resetPassword } from '~/api/authService';

import styles from './InputNewPassword.module.scss';

function InputNewPassword() {
    const [error, setError] = useState(null);
    const [mess, setMess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('resetToken');

    const initialValues = {
        newPassword: '',
    };

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Confirm Password must match to Password.')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (value) => {
        const newPassword = value.newPassword;
        try {
            const data = {
                newPassword: newPassword, // Retrieve email from the URL parameter or state
                token: token, // The verification code entered by the user
            };
            const response = await resetPassword(data);
            console.log("newPassword:", newPassword);
            console.log("token:", token);

            console.log(response.data);
            setError(response.data.serverError)
            if (response.status === 'Ok') {
                setMess("Your password is successfully changed.")
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} >
                    <h1>Change Password</h1>
                    <p className={styles.text}>Enter a new Password below to change your password.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <Form className={styles.form}>
                                <TextField
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    label="New Password"
                                    variant="outlined"
                                    className={styles.field}
                                    name="newPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.newPassword}
                                    error={!!touched.newPassword && !!errors.newPassword}
                                    helperText={touched.newPassword && errors.newPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    type={showConfirm ? "text" : "password"}
                                    fullWidth
                                    label="Confirm Password"
                                    variant="outlined"
                                    className={styles.field}
                                    name="confirmPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirm(!showConfirm)} // Use showConfirm state
                                                    edge="end"
                                                >
                                                    {showConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />} {/* Use showConfirm state */}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error && <div className={styles.error}>{error}</div>}
                                {mess && <div className={styles.mess}>{mess}</div>}
                                <div className={styles.submit}>
                                    <button className={styles.btnCancel} type="button" onClick={() => navigate('/')}>
                                        Cancel
                                    </button>

                                    <button className={styles.btnSearch} type="submit">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </>
    )
}

export default InputNewPassword;
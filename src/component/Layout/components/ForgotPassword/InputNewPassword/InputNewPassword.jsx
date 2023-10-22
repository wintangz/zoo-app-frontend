import { TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import styles from './InputNewPassword.module.scss';

function InputNewPassword() {
    const navigate = useNavigate();

    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm Password must match to Password.')
            .required('Confirm Password is required'),
    });

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} >
                    <h1>Change Password</h1>
                    <p className={styles.text}>Enter a new Password below to change your password.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <Form action='#' className={styles.form}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="New Password"
                                    variant="outlined"
                                    className={styles.field}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                                <TextField
                                    type="text"
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
                                />
                                <div className={styles.submit}>
                                    <button className={styles.btnCancel} type="submit" onClick={() => navigate('/')}>
                                        Canncel
                                    </button>

                                    <button className={styles.btnSearch} type="submit">
                                        Confirm
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
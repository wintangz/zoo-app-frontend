import React, { useEffect, useRef, useState } from 'react';
import { sentEmail } from '~/api/userService'

import styles from './ForgotPassword.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function ForgotPassword({ onClose, onLoginClick }) {

    const forgotpasswordFormRef = useRef(null);

    const handleClickOutsideForm = (event) => {
        if (forgotpasswordFormRef.current && !forgotpasswordFormRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideForm);

        return () => {
            document.removeEventListener('click', handleClickOutsideForm);
        };
    }, []);

    const handleSearchClick = async (values) => {
        try {
            const response = await sentEmail(values);
            console.log(response);

        } catch (error) {
            console.log(error)
        }
    };

    const initialValues = {
        email: '',
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} ref={forgotpasswordFormRef}>
                    <div className={styles.close} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Find Your Account</h1>
                    <Formik initialValues={initialValues} onSubmit={handleSearchClick}>
                        {({ values, errors, }) => (
                            <Form className={styles.form}>
                                <div className={styles.inputBox}>
                                    <p>Please enter your email address to search for your account.</p>
                                    <Field
                                        type='text'
                                        name='email'
                                        values='values.email'
                                        placeholder='Email'
                                    />
                                    <ErrorMessage name='email' component='div' className={styles.error} />
                                </div>
                                <div className={styles.submit}>
                                    <button onClick={onLoginClick} className={styles.btnCancel}>
                                        Cancel
                                    </button>
                                    <button onClick={handleSearchClick}
                                        type='submit' // Use type='submit' for the Search button
                                        className={styles.btnSearch}
                                    >
                                        Search
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

export default ForgotPassword;
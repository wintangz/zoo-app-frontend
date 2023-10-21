import { useEffect, useRef } from 'react';
import { sentEmail } from '~/api/authService';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import styles from './ForgotPassword.module.scss';

function ForgotPassword({ onClose, onLoginClick }) {

    const forgotpasswordFormRef = useRef(null);

    const [error, setError] = useState(null);

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
            setError(response.data.serverError)
            console.log(response.data)
        } catch (error) {

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
                                    <p>Please enter your email address to get verication code.</p>
                                    <Field
                                        type='text'
                                        name='email'
                                        values={values.email}
                                        placeholder='Email'
                                    />
                                    <ErrorMessage name="email" component="div" className={styles.error} />

                                    {error && <div className={styles.error}>{error}</div>}

                                </div>
                                <div className={styles.submit}>
                                    <button onClick={onLoginClick} className={styles.btnCancel}>
                                        Cancel
                                    </button>
                                    <button onClick={handleSearchClick}
                                        type='submit'
                                        className={styles.btnSearch}
                                    >
                                        Send
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
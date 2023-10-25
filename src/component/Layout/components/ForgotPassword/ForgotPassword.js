import { useEffect, useRef } from 'react';
import { sentEmail } from '~/api/authService';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ForgotPassword.module.scss';

function ForgotPassword({ onClose, onLoginClick }) {

    const forgotpasswordFormRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    // const handleClickOutsideForm = (event) => {
    //     if (forgotpasswordFormRef.current && !forgotpasswordFormRef.current.contains(event.target)) {
    //         onClose();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutsideForm);

    //     return () => {
    //         document.removeEventListener('click', handleClickOutsideForm);
    //     };
    // }, []);

    const handleSearchClick = async (values) => {
        try {
            setIsLoading(true); // Set loading to true
            setError(null);
            const response = await sentEmail(values);
            setError(response.data.serverError)
            console.log(response.data)
            if (response.status === 'Ok') {
                setTimeout(() => {
                    navigate(`/verify?email=${values.email}`);
                }, 0);
            }

        } catch (error) {
            console.log(error)
            return error;
        } finally {
            setIsLoading(false); // Set loading back to false
        }

    };

    const initialValues = {
        email: '',
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} /*ref={forgotpasswordFormRef}*/>
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
                                    {isLoading && <div className={styles.loadingMessage}>Server is identifying the email...</div>}
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
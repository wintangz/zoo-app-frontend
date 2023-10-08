import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import jwt_decode from "jwt-decode";

import styles from './loginform.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import '../../../../assets/themify-icons.css';


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function LoginForm({ open }) {
    const initialValues = {
        username: '',
        password: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Send a POST request to the login API
            const response = await axios.post('http://localhost:8080/api/auth/login', values);

            // Handle the response as needed
            localStorage.setItem('token', response.data.accessToken);
            var token = response.data.accessToken;
            var decode = jwt_decode(token);
            // Close the modal or perform other actions
            if (response.status === 200) {
                decode.roles.map((role) => {
                    if (role === 'ADMIN') {
                        window.location = '/dashboard';
                    }
                })
                // if (localStorage.getItem('role')) {
                //     console.log("true")
                //     window.location = '/mainPage';
                // } else {
                //     console.log(false);
                // }
            }
            open(false);
        } catch (error) {
            // Handle errors
            console.error('Error during login:', error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the click is outside the modal
            if (!document.querySelector(`.${styles.modal}`).contains(event.target)) {
                // Close the modal
                open(false);
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [open]);



    return (
        <div className={`${styles.overlay}`}>
            <div className={styles.modal}>
                <div className={styles.close} onClick={() => open(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </div>

                <h1>Login</h1>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="username" className={styles.label}>
                                <i className="ti-user"></i>
                                <div className={styles.title}>Username</div>
                            </label>
                            <Field type="text" name="username" className={styles.input} placeholder="Username" />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className={styles.error}
                                style={{ color: 'red' }}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password" className={styles.label}>
                                <i className="ti-lock"></i>
                                <div className={styles.title}>Password</div>
                            </label>
                            <Field type="password" name="password" className={styles.input} placeholder="Password" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles.error}
                                style={{ color: 'red' }}
                            />
                        </div>

                        <button type="submit" id="login">
                            Login
                        </button>
                    </Form>
                </Formik>

                <div className={styles.footer}></div>
            </div>
        </div>
    );
}

export default LoginForm;

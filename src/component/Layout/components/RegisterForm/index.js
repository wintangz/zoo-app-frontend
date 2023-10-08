import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import jwt_decode from "jwt-decode";
import * as Yup from 'yup';
import axios from 'axios';

import styles from './RegisterForm.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    birthDate: Yup.date().required('Birth Date is required'),
    citizenID: Yup.string().required('Citizen ID is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
});

function RegisterForm({ setOpenLoginForm, setOpenRegisterForm }) {

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        citizenID: '',
        email: '',
        phoneNumber: '',
        address: '',
        country: '',
    }

    const handleRegister = async (values, { setSubmitting }) => {
        try {
            // Send a POST request to the registration API
            const response = await axios.post('http://localhost:8080/api/auth/register', values);

            // Handle the response as needed
            localStorage.setItem('token', response.data.accessToken);
            var token = response.data.accessToken;
            var decode = jwt_decode(token);

            if (response.status === 200) {
                // Perform actions based on the registration success
                decode.roles.map((role) => {
                    if (role === 'ADMIN') {
                        window.location = '/mainPage';
                    }
                });
            }

            // Close the modal or perform other actions
            setOpenRegisterForm(false);
        } catch (error) {
            // Handle errors
            console.error('Error during registration:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const countries = [
        "VietNam",
        "United States",
        "China",
        "India",
        "Brazil",
        "Russia",
        "United Kingdom",
        "France",
        "Germany",
        "Japan",
        "South Korea",
        "Canada",
        "Australia",
        "Mexico",
        "South Africa",
        "Nigeria",
        "Egypt",
        "Argentina",
        "Italy",
        "Spain",
        "Turkey",
    ];


    const handleLoginClick = () => {
        setOpenLoginForm(true); // Open the login form
        setOpenRegisterForm(false); // Close the register form
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const containerElement = document.querySelector(`.${styles.overlay}`);
            console.log(containerElement); // Add this line for debugging

            // Check if the click is outside the form
            if (containerElement && !containerElement.contains(event.target)) {
                setOpenRegisterForm(false);
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setOpenRegisterForm]);

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <div className={styles.close} onClick={() => setOpenRegisterForm(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Register</h1>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleRegister}
                        validationSchema={RegisterSchema}
                    >
                        <Form action='#' className={styles.form}>
                            <div className={styles.inputBox}>
                                <label>Username</label>
                                <Field type='text' name='username' placeholder='Username' />
                                <ErrorMessage name='username' component='div' className={styles.error} />
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Password</label>
                                    <Field type='password' name='password' placeholder="Password" />
                                    <ErrorMessage name='password' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Confirm Password</label>
                                    <Field type='password' name='confirmPassword' placeholder="Confirm Password" />
                                    <ErrorMessage name='confirmPassword' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>First Name</label>
                                    <Field type='text' name='firstName' placeholder="First Name" />
                                    <ErrorMessage name='firstName' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Last Name</label>
                                    <Field type='text' name='lastName' placeholder="Last Name" />
                                    <ErrorMessage name='lastName' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Birth Date</label>
                                    <Field type='date' name='birthDate' />
                                    <ErrorMessage name='birthDate' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Citizen ID</label>
                                    <Field type='text' name='citizenID' placeholder="Citizen ID" />
                                    <ErrorMessage name='citizenID' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.genderCheck}>
                                <h5>Gender</h5>
                                <div className={styles.gender}>
                                    <div className={styles.option}>
                                        <Field type='radio' id='check-male' name='gender' value='male' />
                                        <label htmlFor='check-male'>Male</label>
                                    </div>
                                    <div className={styles.option}>
                                        <Field type='radio' id='check-female' name='gender' value='female' />
                                        <label htmlFor='check-female'>Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Email</label>
                                    <Field type='text' name='email' placeholder="Email" />
                                    <ErrorMessage name='email' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Phone Number</label>
                                    <Field type='text' name='phoneNumber' placeholder="Phone Number" />
                                    <ErrorMessage name='phoneNumber' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Address</label>
                                    <Field type='text' name='address' placeholder="Address" />
                                    <ErrorMessage name='address' component='div' className={styles.error} />
                                </div>
                                <div className={styles.selectBox}>
                                    <label>Country</label>
                                    <Field as='select' name='country'>
                                        <option hidden>Country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='country' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.linkBtn_warp}>
                                Have an Account, <b onClick={handleLoginClick} className={styles.linkBtn}>Login now!!!</b>
                            </div>


                            <button className={styles.submit} type='submit' id='register'>
                                Register
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;
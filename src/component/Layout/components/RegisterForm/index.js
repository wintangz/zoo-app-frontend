import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import jwt_decode from "jwt-decode";
import * as Yup from 'yup';
import axios from 'axios';
import { decode } from '~/utils/axiosClient';

import styles from './RegisterForm.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object().shape({
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

function RegisterForm({ onClose, onLoginClick }) {

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

    const registerFormRef = useRef(null);
    const handleClickOutsideForm = (event) => {
        if (registerFormRef.current && !registerFormRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideForm);

        return () => {
            document.removeEventListener('click', handleClickOutsideForm);
        };
    }, []);

    // const [data, setData] = useState([]);
    // const saveRegister = (values) => {
    //     axios.post('http://localhost:8080/api/users/customers', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: values.username,
    //             password: values.password,
    //             lastName: values.lastname,
    //             firstName: values.firstname,
    //             // gender: values.sex,
    //             // birthDate: values.dateOfBirth,
    //             address: values.address,
    //             // country: values.nationality,
    //             phoneNumber: values.phone,
    //             email: values.email,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             setData(result)
    //         })
    //         .catch((err) => console.log('error'))
    // }

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        address: '',
        country: '',
    }

    // const handleSubmit = async (values, { setSubmitting }) => {
    //     console.log('Form values submitted:', values);

    //     try {
    //         // Send a POST request to the registration API
    //         const response = await axios.post('http://localhost:8080/api/users/customers', values);

    //         // Handle the response as needed
    //         localStorage.setItem('token', response.data.accessToken);
    //         var token = response.data.accessToken;
    //         var tokendecode = jwt_decode(token);  // Use jwt_decode instead of decode
    //         // Close the modal or perform other actions
    //         if (response.status === 200) {
    //             // const {data} = await getInfo(token)
    //             console.log('Token decode:', tokendecode);

    //             setOpenRegisterForm(false);
    //             alert('Registration successful!'); // Display success message
    //         }
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error during registration:', error);

    //         // Display error messages
    //         if (error.response && error.response.data && error.response.data.errors) {
    //             alert(Object.values(error.response.data.errors).join('\n'));
    //         } else {
    //             alert('An error occurred during registration. Please try again.');
    //         }
    //     } finally {
    //         if (setSubmitting) {
    //             setSubmitting(false);
    //         }
    //     };
    // };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} ref={registerFormRef}>
                    <div className={styles.close} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Register</h1>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, formikBag) => {
                        console.log('Form values submitted:', values);
                        // handleSubmit(values, formikBag);
                    }}>

                        <Form action='#' className={styles.form}>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Username</label>
                                    <Field type='text' name='username' placeholder='Username' />
                                    <ErrorMessage name='username' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Email</label>
                                    <Field type='text' name='email' placeholder="Email" />
                                    <ErrorMessage name='email' component='div' className={styles.error} />
                                </div>
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
                                    <label>Phone Number</label>
                                    <Field type='text' name='phoneNumber' placeholder="Phone Number" />
                                    <ErrorMessage name='phoneNumber' component='div' className={styles.error} />
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
                            <button className={styles.submit} type='submit' id='register'>
                                Register
                            </button>
                            <div className={styles.linkBtn_warp}>
                                <a onClick={onLoginClick} className={styles.linkBtn}>Already have an account?</a>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;
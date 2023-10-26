import { ErrorMessage, Field, Form, Formik, resetForm } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '~/api/authService';
import styles from './RegisterForm.module.scss';

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be at most 20 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.date()
        .required('Birth Date is required')
        .max(new Date(), 'Date of Birth cannot be in the future'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number format'),
    address: Yup.string().required('Address is required'),
    nationality: Yup.string().required('Country is required'),
});

function RegisterForm({ onClose, onLoginClick }) {


    const registerFormRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [failMessage, setFailMessage] = useState(null);

    const countries = [
        "Viet Nam",
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


    // const handleClickOutsideForm = (event) => {
    //     if (registerFormRef.current && !registerFormRef.current.contains(event.target)) {
    //         onClose();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutsideForm);

    //     return () => {
    //         document.removeEventListener('click', handleClickOutsideForm);
    //     };
    // }, []);

    const initialValues = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
        nationality: '',
        sex: 'male',
    }

    const handleSubmit = async (values, { setSubmitting, resetForm } = {}) => {
        if (values.sex === 'male') {
            values.sex = true;
        } else if (values.sex === 'female') {
            values.sex = false;
        }
        try {
            if (values.dateOfBirth && values.dateOfBirth.includes('T')) {
                values.dateOfBirth = values.dateOfBirth;
            } else {
                values.dateOfBirth = `${values.dateOfBirth}T00:00:00`;
            }
            // Use the registerUser function from api.js
            const response = await registerUser(values);
            console.log(response);
            console.log(values);
            // Handle the response as needed
            if (response && response.status === 'Ok') {
                setSuccessMessage('Registration successful!');
                setFailMessage(null);
                resetForm({
                    values: {
                        ...initialValues,
                        confirmPassword: '',
                    },
                });
            } else if (response.status === 400 || response.status === 401) {
                console.log(response.data);
                setSuccessMessage(null);
                setFailMessage(response.data.serverError);
            }
        } finally {
            if (setSubmitting) {
                setSubmitting(false);
            }
        }
    };


    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} /*ref={registerFormRef}*/>
                    {successMessage && (
                        <div className={styles.successMessage}>{successMessage}</div>
                    )}
                    {failMessage && (
                        <div className={styles.failMessage}>{failMessage}</div>
                    )}
                    <div className={styles.close} onClick={onClose} >
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Register</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

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
                                    <Field type='text' name='firstname' placeholder="First Name" />
                                    <ErrorMessage name='firstname' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Last Name</label>
                                    <Field type='text' name='lastname' placeholder="Last Name" />
                                    <ErrorMessage name='lastname' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.inputBox}>
                                    <label>Birth Date</label>
                                    <Field type='date' name='dateOfBirth' />
                                    <ErrorMessage name='dateOfBirth' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputBox}>
                                    <label>Phone Number</label>
                                    <Field type='text' name='phone' placeholder="Phone Number" />
                                    <ErrorMessage name='phone' component='div' className={styles.error} />
                                </div>
                            </div>
                            <div className={styles.genderCheck}>
                                <h5>Gender</h5>
                                <div className={styles.gender}>
                                    <div className={styles.option}>
                                        <Field type='radio' id='check-male' name='sex' value='male' />
                                        <label htmlFor='check-male'>Male</label>
                                    </div>
                                    <div className={styles.option}>
                                        <Field type='radio' id='check-female' name='sex' value='female' />
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
                                    <Field as='select' name='nationality'>
                                        <option hidden>Country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='nationality' component='div' className={styles.error} />
                                </div>
                            </div>
                            <button type='submit' className={styles.submit} id='register'>
                                Register
                            </button>
                            <div className={styles.linkBtn_warp}>
                                <a onClick={onLoginClick} className={styles.linkBtn}>Already have an account?</a>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div >
        </>
    )
}

export default RegisterForm;
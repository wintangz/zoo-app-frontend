import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logo_long_dark } from '~/utils/assets-src';
import { decode } from '~/utils/axiosClient';
import '../../../../assets/themify-icons.css';
import styles from './loginform.module.scss';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function LoginForm({ open, setOpenRegisterForm }) {
    const initialValues = {
        username: '',
        password: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Send a POST request to the login API
            const response = await axios.post('http://localhost:8080/api/auth/login', values);
            console.log(response);

            // Handle the response as needed
            localStorage.setItem('token', response.data.data.accessToken);
            var token = response.data.data.accessToken;
            if (token) {
                var tokendecode = decode(token);
            }
            // Close the modal or perform other actions
            if (response.status === 200) {
                // const {data} = await getInfo(token)
                console.log(tokendecode)
                tokendecode.roles.map((role) => {
                    if (role === 'ADMIN') {
                        window.location = '/team';
                    } else if (role === 'STAFF') {
                        window.location = '/edit'
                    }
                })

            }
            open(false);
        } catch (error) {
            // Handle errors
            console.error(error);
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

    const handleRegisterClick = () => {
        setOpenRegisterForm(true); // Open the register form
        open(false); // Close the login form
    };

    return (
        <div className={`${styles.overlay}`}>
            <div className={styles.modal}>
                <div className={styles.close} onClick={() => open(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </div>

                <div className={styles.headerwrap}>
                    <div className={styles.imgwarp}><img src={logo_long_dark} /></div>
                    <h1>Login</h1>
                </div>

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
                                style={{ color: 'red', fontSize: '1.2rem' }}
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
                                style={{ color: 'red', fontSize: '1.2rem' }}
                            />
                        </div>

                        <div style={{ fontSize: '1rem' }}>
                            Don't have Account yet, <b onClick={handleRegisterClick} className={styles.linkBtn}>Register now!!!</b>
                        </div>

                        <button className={styles.submit} type="submit" id="login">
                            Login
                        </button>
                    </Form>
                </Formik>

                {/* <div className={styles.footer}></div> */}
            </div>
        </div>
    );
}

export default LoginForm;

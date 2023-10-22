import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginUser } from '~/api/authService';
import { useAppContext } from '~/context/Context';
import { logo_long_dark } from '~/utils/assets-src';
import { decode } from '~/utils/axiosClient';
import '../../../../assets/themify-icons.css';
import styles from './Loginform.module.scss';


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function LoginForm({ onClose, onRegisterClick, onForgotPasswordClick }) {
    const initialValues = {
        username: '',
        password: '',
    };
    const { setAuth } = useAppContext()
    const [failMessage, setFailMessage] = useState(null);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await loginUser(values);
            localStorage.setItem('token', response.data.data.accessToken);
            var token = response.data.data.accessToken;
            var tokendecode = decode(token);
            // Close the modal or perform other actions
            if (response.status === 200) {
                // const {data} = await getInfo(token)
                setAuth(true)
                tokendecode.roles.map((role) => {
                    if (role !== 'CUSTOMER') {
                        window.location = '/team';
                    } else if (role === 'STAFF') {
                        window.location = '/edit'
                    }
                })
                // if (localStorage.getItem('role')) {
                //     console.log("true")
                //     window.location = '/mainPage';
                // } else {
                //     console.log(false);
                // }

            }
            onClose();
        } catch (error) {
            // Handle errors
            console.error('Error during login:', error);
            setFailMessage("Username or Password is incorrect!");

        } finally {
            setSubmitting(false);
        }
    };


    const loginFormRef = useRef(null);

    const handleClickOutsideForm = (event) => {
        if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideForm);

        return () => {
            document.removeEventListener('click', handleClickOutsideForm);
        };
    }, []);

    return (
        <div className={`${styles.overlay}`}>
            <div className={styles.modal} ref={loginFormRef} >
                <div className={styles.close} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} />
                </div>

                <div className={styles.headerwrap}>
                    <div className={styles.imgwarp}><img src={logo_long_dark} /></div>
                    <h1>Login</h1>
                </div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                    <Form className={styles.form}>
                        {failMessage && (
                            <div className={styles.failMessage}>{failMessage}</div>
                        )}
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
                        <button className={styles.submit} type="submit" id="login">
                            Login
                        </button>
                        <div className={styles.linkBtn_warp}>
                            <a onClick={onForgotPasswordClick} className={styles.linkBtn}>Forgotten password?</a>
                            <a onClick={onRegisterClick} className={styles.linkBtn}>Sign up for SaigonZoo</a>
                        </div>
                    </Form>
                </Formik>
            </div>

        </div>
    );
}

export default LoginForm;

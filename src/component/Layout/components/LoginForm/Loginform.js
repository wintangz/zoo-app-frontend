import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [failMessage, setFailMessage] = useState(null);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            const response = await loginUser(values);
            var token = response.data.accessToken;
            var tokendecode = decode(token);
            localStorage.setItem('token', response.data.accessToken);

            if (response.status === "Ok") {
                setAuth(true)
                for (let index = 0; index < tokendecode.roles.length; index++) {
                    if (tokendecode.roles[index] === 'ADMIN') {
                        window.open('/dashboard', '_blank');
                        window.location.reload();
                        break;
                    }
                    if (tokendecode.roles[index] === 'STAFF') {
                        window.open('/dashboard', '_blank');
                        window.location.reload();
                        break;
                    }
                    if (tokendecode.roles[index] === 'ZOO_TRAINER') {
                        window.open('/dashboard', '_blank');
                        window.location.reload();
                        break;
                    }
                    if (tokendecode.roles[index] === 'CUSTOMER') {
                        window.location.reload();
                        break;
                    }
                }
            }
            onClose();
        } catch (error) {
            console.error('Error during login:', error);
            setFailMessage("Username or Password is incorrect!");

        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };


    // const loginFormRef = useRef(null);

    // const handleClickOutsideForm = (event) => {
    //     if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
    //         onClose();
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutsideForm);

    //     return () => {
    //         document.removeEventListener('click', handleClickOutsideForm);
    //     };
    // }, []);



    return (
        <div className={`${styles.overlay}`}>
            <div className={styles.modal}/* ref={loginFormRef} */>
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
                            {isLoading ? (
                                <div className={styles.loader}></div>
                            ) : (
                                'Login'
                            )}
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

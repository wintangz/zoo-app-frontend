// import '../../assests/themify-icons.css';
// import styles from './loginform.module.scss';

// function LoginForm({ open }) {
//     return (<>
//         <div className={`${styles.overlay}`}>
//             <div className={styles.modal}>
//                 <div className={styles.close} onClick={() => open(false)}>
//                     <i className='ti-close'></i>
//                 </div>

//                 <h1>Login</h1>

//                 <div className={styles.form}>

//                     <div className={styles.field}>
//                         <label for='' className={styles.label}>
//                             <i className='ti-user'></i>
//                             <div className={styles.title}>Username</div>
//                         </label>
//                         <input type='text' className={styles.input} placeholder='Username'></input>
//                     </div>

//                     <div className={styles.field}>
//                         <label for='' className={styles.label}>
//                             <i className='ti-lock'></i>
//                             <div className={styles.title}>Password</div>
//                         </label>
//                         <input type='password' className={styles.input} placeholder='Password'></input>
//                     </div>

//                     <button id='login'>Login</button>
//                 </div>
//                 <div className={styles.footer}></div>
//             </div>
//         </div>
//     </>);
// }

// export default LoginForm;

import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

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
            console.log('Login successful:', response.data);

            // Close the modal or perform other actions
            open(false);
        } catch (error) {
            // Handle errors
            console.error('Error during login:', error);
        } finally {
            setSubmitting(false);
        }
    };

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

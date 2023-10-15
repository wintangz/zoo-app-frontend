import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '~/api/loginService';
import styles from './RegisterForm.module.scss';

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

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('Form values submitted:', values);

        try {
            // Transform the form values to match the expected format
            const userData = {
                username: values.username,
                password: values.password,
                lastName: values.lastName,
                firstName: values.firstName,
                birthDate: values.birthDate,
                email: values.email,
                phoneNumber: values.phoneNumber,
                address: values.address,
                country: values.country,
            };

            // Use the registerUser function from api.js
            const response = await registerUser(userData);

            // Handle the response as needed
            if (response.status === 200) {
                alert('Registration successful!'); // Display success message
            }
        } catch (error) {
            // Handle errors
            console.error('Error during registration:', error);

            // Display error messages
            if (error.response && error.response.data && error.response.data.errors) {
                alert(Object.values(error.response.data.errors).join('\n'));
            } else {
                alert('An error occurred during registration. Please try again.');
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
                <div className={styles.container} ref={registerFormRef}>
                    <div className={styles.close} onClick={onClose} >
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Register</h1>
                    <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, formikBag) => {
                            console.log('Form values submitted:', values);
                            handleSubmit(values, formikBag);
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


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import logo from "../../UI/Logo/logo.png";
// import React from "react";
// import RegisterCSS from "../../UI/Layout/Register.module.css"
// function Register() {
//   let navigate = useNavigate()
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     address: "",
//     birth: "",
//     age: "",
//     sex: "",
//     role: "member"
//   })
//   const { email, password, firstName, lastName, phone, address, birth, age, sex } = user

//   const onInputChange = (event) => {
//     setUser({ ...user, [event.target.name]: event.target.value })
//   }

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/api/v1/user/save", user);
//       alert("User registation Successfully");
//       navigate("/")
//     } catch (err) {
//       alert(err);
//     }
//   }


//   return (
//     <div className={RegisterCSS['wrapper']} id="wrapper">
//       <form className={RegisterCSS['form-login']} onSubmit={onSubmit} id="form-login">
//         <div className={RegisterCSS['image']} >
//           <img src={logo} alt="" />
//         </div>
//         <h1 className={RegisterCSS['form-heading']} >Đăng ký tài khoản</h1>
//         <div className={RegisterCSS['submit']}>
//           <div className={RegisterCSS['form-group_1']}>
//             <input type="text"
//               name="lastName"
//               className={RegisterCSS['form-input']} placeholder="Họ"
//               value={lastName}
//               onChange={onInputChange}
//             />
//           </div>
//           <div><p>Và</p></div>
//           <div className={RegisterCSS['form-group_1']}>
//             <input type="text"
//               name="firstName"
//               className={RegisterCSS['form-input']} placeholder="Tên"
//               value={firstName}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>
//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-phone"></i>
//             <input type="text"
//               name="phone"
//               className={RegisterCSS['form-input']} placeholder="Số điện thoại"
//               value={phone}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>
//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-age"></i>
//             <input type="number"
//               name="age"
//               className={RegisterCSS['form-input']} placeholder="Tuổi"
//               value={age}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>

//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-envelope"></i>
//             <input type="email"
//               name="email"
//               className={RegisterCSS['form-input']} placeholder="Email"
//               value={email}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>

//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-key"></i>
//             <input type="password"
//               name="password"
//               className={RegisterCSS['form-input']} placeholder="Mật khẩu"
//               value={password}
//               onChange={onInputChange}
//             />
//             <div className={RegisterCSS['eye']}>
//               <i className="fa fa-eye"></i>
//             </div>
//           </div>
//         </div>

//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-calendar"></i>
//             <input type="date"
//               name="birth"
//               className={RegisterCSS['form-input']} placeholder="Năm sinh"
//               value={birth}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>

//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group_2']}>
//             <div className={RegisterCSS['form-group_2_gender']} >
//               <label for="gender">Giới tính:</label>

//               <div className={RegisterCSS['from-check']}>
//                 <input type="radio"
//                   name="sex"
//                   className="from-check-input"
//                   value="male"
//                   checked={sex === "male"} // Kiểm tra nếu sex là male thì checked
//                   onChange={onInputChange}
//                 />
//                 <label for="" className="from-check-label">Nam</label>
//               </div>

//               <div className="from-check">
//                 <input type="radio"
//                   name="sex"
//                   className="from-check-input"
//                   value="female"
//                   checked={sex === "female"} // Kiểm tra nếu sex là female thì checked
//                   onChange={onInputChange}
//                 />
//                 <label for="" className="from-check-label">Nữ</label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={RegisterCSS['submit_1']} >
//           <div className={RegisterCSS['form-group']}>
//             <i className="fa fa-address-card"></i>
//             <input type="text"
//               name="address"
//               className={RegisterCSS['form-input']} placeholder="Địa chỉ"
//               value={address}
//               onChange={onInputChange}
//             />
//           </div>
//         </div>
//         {/* <div className="submit_1">
//           <div className="form-group">
//             <i className="fa fa-user"></i>
//             <input type="text" name="" className="form-input" placeholder="Tài khoản" />
//           </div>
//         </div> */}

//         {/* <div className="submit_1">
//           <div className="form-group">
//             <i className="fa fa-key"></i>
//             <input type="password" className="form-input" placeholder="Xác nhận mật khẩu" />
//             <div id="eye_1">
//               <i className="fa fa-eye"></i>
//             </div>
//           </div>
//         </div> */}
//         <div className={RegisterCSS['submit_check']}>
//           <input type="checkbox" name="checkbox" id="check1" />
//           <div>
//             Bằng việc đăng ký, bạn đồng ý với <span className={RegisterCSS['form_B']}>Điều khoản</span> sử dụng và
//             <span className={RegisterCSS['text_B']} >Chính sách</span>
//             bảo mật của <span className={RegisterCSS['text_B']} >Dog & Cat</span>
//           </div>
//         </div>
//         <div className={RegisterCSS['submit_1']} >
//           <input type="submit" value="Đăng ký" className={RegisterCSS['form-submit']} />
//         </div>
//         <div>
//           <p className={RegisterCSS['text_2']}>Đã có tài khoản?
//             <span className={RegisterCSS['text_span']} >
//               <a href="/login">Đăng nhập ngay</a>
//             </span>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;

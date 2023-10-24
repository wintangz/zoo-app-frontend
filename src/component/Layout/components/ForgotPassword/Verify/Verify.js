import { Box, TextField, Link } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { verificationCode } from '~/api/authService';
import { useFormik } from 'formik';
import { Field, Form, Formik } from 'formik';
import OtpInput from "otp-input-react";


import styles from './Verify.module.scss';

function Verify() {


    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handleSubmit = async () => {
        try {
            if (code === null) {
                setError("OTP is required");
            }
            const data = {
                email: email, // Retrieve email from the URL parameter or state
                code: code, // The verification code entered by the user
            };
            const response = await verificationCode(data);
            console.log("Code:", code);
            console.log("Email:", email);

            console.log(response.data);
            setError(response.data.serverError)
            if (response.status === 'Ok') {
                setError("");
                console.log(response.data.resetToken);
                navigate(`/inputnewpassword?resetToken=${response.data.resetToken}`);
            } else if (response.data.message === "Invalid") {
                setError("OTP is Invalid");
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <h1>Confirm transaction</h1>
                    <p>Please enter your email address to search for your account.</p>
                    <Formik initialValues={{ code: "" }} onSubmit={handleSubmit}>
                        <Form className={styles.form}>
                            <OtpInput
                                value={code}
                                onChange={setCode}
                                OTPLength={6}
                                otptype="number"
                                autoFocus
                                name="code"
                                className={styles.otpContainer}
                            />
                            {error && <div className={styles.error}>{error}</div>}
                            <div className={styles.submit}>
                                <button className={styles.btnCancel} type="button" onClick={() => navigate('/')}>
                                    Cancel
                                </button>

                                <button type="submit" className={styles.btnSearch}>
                                    Confirm
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Verify;

import { Box, TextField, Link } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Verify.module.scss';

function Vertify() {
    const navigate = useNavigate();
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const handleOTPChange = (e, index) => {
        const value = e.target.value;

        // Ensure that the input value is a single digit or an empty string
        if (/^\d$/.test(value) || value === '') {
            setOTP((prevOTP) => {
                const newOTP = [...prevOTP];
                newOTP[index] = value;
                return newOTP;
            });

            // Move to the next input field, or the previous one if the user presses backspace
            if (value === '' && index > -1) {
                inputRefs[index - 1] && inputRefs[index - 1].current.focus();
            } else if (index < 5) {
                inputRefs[index + 1] && inputRefs[index + 1].current.focus();
            }
        }
    };
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} >
                    <h1>Confirm transaction</h1>
                    <p>Please enter your email address to search for your account.</p>
                    <form action='#' className={styles.form}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            {otp.map((digit, index) => (
                                inputRefs[index] && (
                                    <TextField
                                        key={index}
                                        inputRef={inputRefs[index]}
                                        variant="standard"
                                        fullWidth
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleOTPChange(e, index)}
                                        inputProps={{ maxLength: 1 }}
                                        className={styles.text}
                                        color="warning"
                                    />
                                )
                            ))}
                        </Box>
                        <div className={styles.submit}>
                            <button className={styles.btnCancel} type="submit" onClick={() => navigate('/')}>
                                Canncel
                            </button>

                            <button className={styles.btnSearch} type="submit">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Vertify;
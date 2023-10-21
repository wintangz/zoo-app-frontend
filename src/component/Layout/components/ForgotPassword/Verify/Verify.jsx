import { Box, TextField } from '@mui/material';
import { useRef, useState } from 'react';

import styles from './Verify.module.scss';

function Vertify() {
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
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleOTPChange(e, index)}
                                        inputProps={{ maxLength: 1 }}
                                        style={{ flex: 1, maxWidth: 50, margin: '0 5px', background: 'white' }}
                                    />
                                )
                            ))}
                        </Box>
                        <div className={styles.submit}>
                            <button className={styles.btnCancel} type="submit">
                                Canncel
                            </button>
                            <button className={styles.btnSearch} type="submit" id="login">
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
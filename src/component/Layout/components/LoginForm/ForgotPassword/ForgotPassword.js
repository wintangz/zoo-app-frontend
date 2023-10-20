import React, { useEffect, useRef } from 'react';

import styles from './ForgotPassword.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ForgotPassword({ onClose, onLoginClick }) {

    const forgotpasswordFormRef = useRef(null);
    const handleClickOutsideForm = (event) => {
        if (forgotpasswordFormRef.current && !forgotpasswordFormRef.current.contains(event.target)) {
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
        <>
            <div className={styles.overlay}>
                <div className={styles.container} ref={forgotpasswordFormRef}>
                    <div className={styles.close} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <h1>Find Your Account</h1>
                    <form action='#' className={styles.form}>
                        <div className={styles.inputBox}>
                            <p>Please enter your email address to search for your account.</p>
                            <input type='text' name='email' placeholder='Email' />
                        </div>
                        <div className={styles.submit}>
                            <button onClick={onLoginClick} className={styles.btnCancel} type="submit" id="login">
                                Cancel
                            </button>
                            <button className={styles.btnSearch} type="submit" id="login">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;

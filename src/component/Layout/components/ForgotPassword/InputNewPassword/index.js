import React, { useEffect, useRef } from 'react';

import styles from './InputNewPassword.module.scss';

function InputNewPassword() {

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container} >
                    <h1>Find Your Account</h1>
                    <form action='#' className={styles.form}>
                        <div className={styles.inputBox}>
                            <p>Please enter your email address to search for your account.</p>
                            <input type='text' name='email' placeholder='Email' />
                        </div>
                        <div className={styles.submit}>
                            <button className={styles.btnCancel} type="submit" id="login">
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

export default InputNewPassword;
import styles from './RegisterForm.module.scss'
import React from 'react'

function RegisterForm({ setOpenLoginForm, setOpenRegisterForm }) {

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


    const handleLoginClick = () => {
        setOpenLoginForm(true); // Open the login form
        setOpenRegisterForm(false); // Close the register form
    };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <h1>Register</h1>
                    <form action='#' className={styles.form}>
                        <div className={styles.inputBox}>
                            <label>Username</label>
                            <input type='text' placeholder="Username" />
                        </div>
                        <div className={styles.column}>
                            <div className={styles.inputBox}>
                                <label>Password</label>
                                <input type='password' placeholder="Password" />
                            </div>
                            <div className={styles.inputBox}>
                                <label>Confirm Password</label>
                                <input type='password' placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.inputBox}>
                                <label>First Name</label>
                                <input type='text' placeholder="First Name" />
                            </div>
                            <div className={styles.inputBox}>
                                <label>Last Name</label>
                                <input type='text' placeholder="Last Name" />
                            </div>
                            <div className={styles.inputBox}>
                                <label>Phone Number</label>
                                <input type='text' placeholder="Phone Number" />
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.inputBox}>
                                <label>Citizen ID</label>
                                <input type='text' placeholder="Citizen ID" />
                            </div>
                            <div className={styles.selectBox}>
                                <label>Country</label>
                                <select>
                                    <option hidden>Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.inputBox}>
                                <label>Birth Date</label>
                                <input type='date' />
                            </div>
                        </div>
                        <div className={styles.genderCheck}>
                            <h3>Gender</h3>
                            <div className={styles.gender}>
                                <div className={styles.option}>
                                    <input type='radio' id='check-male' name='gender' checked />
                                    <label for='check-male'>Male</label>
                                </div>
                                <div className={styles.option}>
                                    <input type='radio' id='check-female' name='gender' />
                                    <label for='check-female'>Female</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.inputBox}>
                            <label>Email</label>
                            <input type='text' placeholder="Email" />
                        </div>
                        <div className={styles.inputBox}>
                            <label>Address</label>
                            <input type='text' placeholder="Address" />
                        </div>
                    </form>

                    <button onClick={handleLoginClick} className={styles.linkBtn}>
                        Have an Account, Login now!!!
                    </button>


                    <button className={styles.submit}>
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;
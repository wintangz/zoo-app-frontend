import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import styles from './About.module.scss';
import { About as AboutImg } from '~/utils/assets-src';

import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosMailUnread } from 'react-icons/io';
import { HandleOpenClose } from '~/component/Layout/components/HandleOpenClose';
function About() {
    const {
        showLogin,
        showRegister,
        showForgotPassword,

        handleLoginFormClick,
        handleRegisterFormClick,
        handleForgotPasswordFormClick,

        handleCloseLogin,
        handleCloseRegister,
        handleCloseForgotPassword,
    } = HandleOpenClose();
    return (

        <>
            <div className={styles.about__container}>
                <div className={styles.background}>
                    <NormalBanner />
                </div>
                <div className={styles.content}>
                    <div className={styles.front__content}>
                        {/* <div className={styles.form}>
                            <div className={styles.up__line}>
                                <h2>Send Your Message To Us</h2>
                            </div>
                            <div className={styles.bottom__line}>
                                <p>Your email address will not be published.</p>
                            </div>
                            <form>
                                <div className={styles.row1}>
                                    <div className={styles.div__row1}>
                                        <input type="text" placeholder="Name*" />
                                    </div>
                                    <div className={styles.div__row1}>
                                        <input type="text" placeholder="Phone Number*" />
                                    </div>
                                </div>
                                <div className={styles.row1}>
                                    <div className={styles.div__row1}>
                                        <input type="text" placeholder="Email*" />
                                    </div>
                                    <div className={styles.div__row1}>
                                        <input type="text" placeholder="Subject*" />
                                    </div>
                                </div>
                                <div className={styles.row2}>
                                    <div>
                                        <textarea placeholder="Message" />
                                    </div>
                                </div>
                                <div className={styles.checkbox}>
                                    <label>
                                        <input type="checkbox" />&nbsp;&nbsp;Save my name, email, and website in this browser for the next time I comment
                                    </label>
                                </div>
                                <div className={styles.button}>
                                    <button>Contact Us!</button>
                                </div>
                            </form>
                        </div> */}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ width: '30vw', marginTop: "3vh" }}>
                                <div className={styles.welcome}>
                                    <h2 style={{ fontSize: "50px", fontWeight: "650", marginBottom: "24px" }}>Sai Gon Zoo</h2>

                                </div>
                                <p style={{ fontSize: "16px", marginRight: "4vw", lineHeight: "1.5" }}>As one of the oldest and historically significant landmarks in Ho Chi Minh City, the Saigon Zoological and Botanical Gardens is not only a historical relic but also a distinctive cultural symbol of the city. Constructed simultaneously with the Ho Chi Minh City Post Office, Notre-Dame Cathedral Basilica of Saigon, and Ben Thanh Market, the Saigon Zoological and Botanical Gardens stands as a testament to history, having endured the ups and downs of both the people and the region. Its enduring vitality and unique cultural values have given the Saigon Zoological and Botanical Gardens a distinct and unmistakable character that sets it apart from any other place.</p>
                                <div className={styles.signUpAbout} style={{
                                    background: "transparent",
                                    border: "1px solid black",
                                    width: "20vw",
                                    height: "8vh",
                                    fontSize: "2em",
                                    textAlign: "center",
                                    borderRadius: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    ttransition: "all 0.2s linear",
                                }} onClick={(event) => { handleLoginFormClick(event) }}>Sign up for free</div>
                            </div>
                            <div style={{
                                background: `url(${AboutImg})`, backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                width: "45vw", height: "70vh"
                            }}></div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.content1}>
                                <div className={styles.icon}>
                                    <span><FaMapLocationDot /></span>
                                </div>
                                <div className={styles.text}>
                                    <h1>Our Address</h1>
                                    <p>2 Nguyễn Bỉnh Khiêm</p>
                                    <p>Bến Nghé Quận 1, Hồ Chí Minh</p>
                                </div>
                            </div>
                            <div className={styles.content2}>
                                <div className={styles.icon}>
                                    <span><IoIosMailUnread /></span>
                                </div>
                                <div className={styles.text}>
                                    <h1>Email Address</h1>
                                    <p>cskh.kdttsaigonzoo@gmail.com</p>
                                    <p>cskh.kdttsaigonzoo@gmail.com</p>
                                </div>
                            </div>
                            <div className={styles.content3}>
                                <div className={styles.icon}>
                                    <span><BsFillTelephoneFill /></span>
                                </div>
                                <div className={styles.text}>
                                    <h1>Call Us</h1>
                                    <p>+028 38291425</p>
                                    <p>+028 38291425</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.down__content}
                        style={{
                            width: "100%",
                            top: "30vh",
                        }}
                    >
                        <div className={styles.map} style={{ marginTop: '16vh' }}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530488!2d106.80730807465963!3d10.841132857997609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1696353690697!5m2!1sen!2s"
                                width="100%"
                                height="610"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade">

                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;

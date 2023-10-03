import React from 'react';
import styles from './About.module.scss';
import NormalBanner from '~/component/Layout/components/NormalBanner';

function About() {
    return (
        <>
            <div className={styles.about__container}>
                <div className={styles.background}>
                    <NormalBanner />
                </div>
                <div className={styles.content}>
                    <div className={styles.front__content}>
                        <div className={styles.form}>
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
                                        <input type="checkbox" />Save my name, email, and website in this browser for the next time I comment
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className={styles.info}></div>
                    </div>
                    <div className={styles.down__content}>
                        <div className={styles.map}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.436264107502!2d106.80668436521351!3d10.841372146093606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1696185552919!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;

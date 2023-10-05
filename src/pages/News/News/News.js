import React from 'react';
import styles from './News.module.scss';

function Title() {
    return (
        <>
            <div className={styles.title}>
                <img src="https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/bengal-tiger.jpg" />
                <div className={styles.info}>
                    <h3>news</h3>
                    <p className={styles.summary}>dsfhgsdufghduz fbu</p>
                </div>
                <div className={styles.meta}>
                    <span className={styles.date}>29 Sep, 2023</span>
                    <span className={styles.type}>Event</span>
                </div>
            </div>
            {/* <div className={styles.}></div> */}
        </>
    );
}

export default Title;

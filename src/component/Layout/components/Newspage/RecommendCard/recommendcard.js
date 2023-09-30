import React from 'react';
import styles from './recommendcard.module.scss';
import img from '~/assets/img/news-voi.jpg';

function RecommendCard() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.imgwrap}>
                    <img src={img} />
                </div>
                <h3 className={styles.title}>News</h3>
                <p className={styles.summary}>hello vanh</p>
                <div className={styles.meta}>
                    <span className={styles.date}>29 Sep, 2023</span>
                    <span className={styles.type}>Event</span>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;

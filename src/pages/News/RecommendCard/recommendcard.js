import React from 'react';
import styles from './recommendcard.module.scss';
import img from '~/assets/img/news-voi.jpg';

function RecommendCard(props) {
    console.log(props)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.imgwrap}>
                    <img src={props.thumbnailUrl} />
                </div>
                <h3 className={styles.title}>{props.title}</h3>
                <p className={styles.summary}>{props.shortDescription}</p>
                <div className={styles.meta}>
                    <span className={styles.date}>{props.createdDate}</span>
                    <span className={styles.type}>Event</span>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;

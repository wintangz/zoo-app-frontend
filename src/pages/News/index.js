import React from 'react';
import styles from './News.module.scss';
import RecommendCard from '~/component/Layout/components/RecommendCard/recommendcard';

function News() {
    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <div className={styles.recommend}>
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                </div>
                <div className={styles.category}>
                    <div className={styles.item}>Lastest</div>
                    <div className={styles.item}>Event</div>
                    <div className={styles.item}>Update</div>
                </div>
            </div>
        </>
    );
}

export default News;

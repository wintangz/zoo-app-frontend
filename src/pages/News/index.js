import React from 'react';
import styles from './News.module.scss';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import Title from '~/pages/News/News/News';

function News() {
    return (
        <div className={styles.news_container}>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <div className={styles.recommend}>
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                </div>
            </div>
            <div className={styles.news_list}>
                <div className={styles.category}>
                    <div className={styles.item}>Lastest</div>
                    <div className={styles.item}>Event</div>
                    <div className={styles.item}>Update</div>
                </div>
                <div className={styles.news}>
                    <Title />
                    <Title />
                    <Title />
                </div>
            </div>
        </div>
    );
}

export default News;

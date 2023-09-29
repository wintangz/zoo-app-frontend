import React from 'react';
import styles from './News.module.scss';
import RecommendCard from '~/component/Layout/components/RecommendCard/recommendcard';

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
                <div className={styles.category}>
                    <div className={styles.item}>Lastest</div>
                    <div className={styles.item}>Event</div>
                    <div className={styles.item}>Update</div>
                </div>
                <div className={styles.news}>
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
                    <div className={styles.title}>
                        <img src="https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/croc.jpg" />
                        <div className={styles.info}>hello</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;

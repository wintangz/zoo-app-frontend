import React from 'react';
import styles from './News.module.scss';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import Title from '~/pages/News/News/News';
import * as recommendService from '~/api/recommendService';
import { useState } from 'react';
import { useEffect } from 'react';

function News() {

    const [recommendResult, setRecommendResult] = useState(null);

    const fetchApi = async () => {
        const result = await recommendService.getRecommend();
        setRecommendResult(result);
    }
    // fetchApi()

    useEffect(() => {
        fetchApi();
    }, []);

    console.log(recommendResult)
    return (
        <div className={styles.news_container}>
            <div className={styles.background}></div>
            <div className={styles.container}>

                {recommendResult && (<div className={styles.recommend}>
                    {recommendResult.map((card) => (
                        <RecommendCard thumbnailUrl={card.thumbnailUrl}
                            title={card.title}
                            shortDescription={card.shortDescription}
                            createdDate={card.createdDate} />
                    ))}
                </div>)}

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

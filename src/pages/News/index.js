import { useAppContext } from '~/context/Context';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import styles from './News.module.scss';
import Pagination from './Pagination/Pagination';
import React, { useState } from 'react';

function News() {
    const { newsResult, recommendResult } = useAppContext();
    const itemsPerPage = 5;
    // console.log(newsResult);

    const [selectedCategory, setSelectedCategory] = useState('Latest'); // Initialize with 'Latest'

    // Filter the newsResult based on the selected category
    const filteredNewsResult = newsResult ? newsResult.filter(news => {
        if (selectedCategory === 'Latest') {
            return true; // Show all
        }
        console.log(news.type)
        return news.type === selectedCategory;
    }) : [];

    return (
        <div className={styles.news_container}>
            <div className={styles.background}></div>
            <div className={styles.container}>

                {recommendResult && (<div className={styles.recommend}>
                    {recommendResult.map((card) => (
                        <RecommendCard post={card} />
                    ))}
                </div>)}

            </div>
            <div className={styles.news_list}>
                <div className={styles.category}>
                    <div
                        className={styles.item}
                        onClick={() => setSelectedCategory('Latest')}
                    >
                        Latest
                    </div>
                    <div
                        className={styles.item}
                        onClick={() => setSelectedCategory('Info')}
                    >
                        Info
                    </div>
                    <div
                        className={styles.item}
                        onClick={() => setSelectedCategory('Event')}
                    >
                        Event
                    </div>
                </div>
            </div>
            <div>
                <Pagination itemsPerPage={itemsPerPage} newsResult={filteredNewsResult} />
            </div>
        </div>
    );
}

export default News;




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

    // Extract unique types from the newsResult
    if (!newsResult) {
        return (
            <div className={styles.container_error}>
                <div className={styles.loader}></div>
            </div>);
    }

    // Extract unique types from the newsResult
    const uniqueTypes = Array.from(new Set(newsResult.map(news => news.type)));

    // Filter the newsResult based on the selected category
    const filteredNewsResult = selectedCategory === 'Latest' ? newsResult : newsResult.filter(news => news.type === selectedCategory);

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
                        style={{
                            backgroundColor: selectedCategory === 'Latest' ? '#161515' : '#e2e2e2',
                            color: selectedCategory === 'Latest' ? '#f8bf02' : '#161515',
                        }}
                        onClick={() => setSelectedCategory('Latest')}
                    >
                        Latest
                    </div>
                    {uniqueTypes.map(type => (
                        <div
                            className={styles.item}
                            style={{
                                backgroundColor: selectedCategory === type ? '#161515' : '#e2e2e2',
                                color: selectedCategory === type ? '#f8bf02' : '#161515',
                            }}
                            onClick={() => setSelectedCategory(type)}
                            key={type}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Pagination itemsPerPage={itemsPerPage} newsResult={filteredNewsResult} />
            </div>
        </div>
    );
}

export default News;




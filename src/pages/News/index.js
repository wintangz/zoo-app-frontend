import { useAppContext } from '~/context/Context';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import styles from './News.module.scss';
import Pagination from './Pagination/Pagination';
import { getNews } from '~/api/newsService';
import Loader from "~/component/Layout/components/Loader/Loader"
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

function News() {
    const [news, setNews] = useState(null);
    const { newsResult, recommendResult } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        const res = getNews();
        res.then((result) => {
            const filter = result.filter(news => {
                return news.status === true;
            })
            setNews(filter);
        });
    }, []);
    // console.log(newsResult);

    const [selectedCategory, setSelectedCategory] = useState('Latest'); // Initialize with 'Latest'

    // Extract unique types from the newsResult
    if (!newsResult || !recommendResult) {
        return (
            <Loader />
        );
    }

    // Extract unique types from the newsResult
    const uniqueTypes = Array.from(new Set(newsResult.map(news => news.type)));

    // Filter the newsResult based on the selected category
    const filteredNewsResult = selectedCategory === 'Latest'
        ? newsResult.filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : newsResult
            .filter(news => news.type === selectedCategory)
            .filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log(news);

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
                    <div className={styles.searchBar}>
                        <CiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search News..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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




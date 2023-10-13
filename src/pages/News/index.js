import { useEffect, useState } from 'react';
import * as newsService from '~/api/newsService';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import styles from './News.module.scss';
import Pagination from './Pagination/Pagination';

function News() {
    //news
    const [newsResult, setNewsResult] = useState(null);
    //recommendCard
    const [recommendResult, setRecommendResult] = useState(null);

    const fetchApi = async () => {
        const result = await newsService.getRecommend();
        setRecommendResult(result);

        const resultTitle = await newsService.getNews();
        setNewsResult(resultTitle);
    }

    // const data = [];
    const itemsPerPage = 5;
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
                        <RecommendCard post={card} />
                    ))}
                </div>)}

            </div>
            <div className={styles.news_list}>
                <div className={styles.category}>
                    <div className={styles.item}> Lastest</div>
                    <div className={styles.item}>Info</div>
                    <div className={styles.item}>Event</div>
                </div>
                {/* {newsResult && (<div className={styles.news}>
                    {newsResult.map((news) => (
                        <NewsPost post={news} />
                    ))
                    }
                </div>)} */}
            </div>
            <div>
                <Pagination itemsPerPage={itemsPerPage} newsResult={newsResult} />
            </div>
        </div>
    );
}

export default News;


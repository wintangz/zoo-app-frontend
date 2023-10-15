import { useAppContext } from '~/context';
import RecommendCard from '~/pages/News/RecommendCard/recommendcard';
import styles from './News.module.scss';
import Pagination from './Pagination/Pagination';

function News() {
    const { newsResult, recommendResult } = useAppContext();
    const itemsPerPage = 5;
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
            </div>
            <div>
                <Pagination itemsPerPage={itemsPerPage} newsResult={newsResult} />
            </div>
        </div>
    );
}

export default News;


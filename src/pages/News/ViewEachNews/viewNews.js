import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '~/api/newsService';
import NormalBanner from '~/component/Layout/components/NormalBanner';
import styles from './View.module.scss';

function ViewEachNews() {
    const { id } = useParams();

    const [selectedNews, setSelectedNews] = useState(null);
    const fetchData = async () => {
        try {
            const data = await getNewsById(id);
            setSelectedNews(data);
        } catch (error) {
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);


    if (!selectedNews) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.imgbanner}>
                <NormalBanner />
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>{selectedNews.title}</h1>
                <p>{selectedNews.shortDescription}</p>
                <img src={selectedNews.thumbnailUrl} />
                <p>{selectedNews.content}</p>
                <p>{selectedNews.createdDate}</p>
            </div>
        </>
    );
}

export default ViewEachNews;

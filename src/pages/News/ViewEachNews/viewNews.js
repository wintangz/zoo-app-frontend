import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
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
<<<<<<< HEAD
                <p>{selectedNews.content}</p>
                <img src={selectedNews.imgUrl} />
=======
                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                />
>>>>>>> 9297c7eead701b569cffe4c65d9f50e5f98cde2d
                <p>{selectedNews.createdDate}</p>
            </div>
        </>
    );
}

export default ViewEachNews;

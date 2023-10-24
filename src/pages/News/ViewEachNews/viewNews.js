import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { getNewsById } from '~/api/newsService';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
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

    const originalDateStr = selectedNews.createdDate; // Assuming it's in the format '2023-10-31T15:34:0000'
    const dateObj = new Date(originalDateStr);
    const day = dateObj.getDate().toString().padStart(2, '0'); // Get day and pad with '0' if needed
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with '0' if needed
    const year = dateObj.getFullYear();

    const formattedDateStr = `${day}/${month}/${year}`;

    return (
        <>
            <div className={styles.imgbanner}>
                <NormalBanner />
            </div>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 >{selectedNews.title}</h1>
                </div>


                <div className={styles.thumbnailContainer}>
                    <img src={selectedNews.thumbnailUrl} />
                </div>

                <div>
                    {selectedNews.shortDescription}
                </div>

                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                />

                <div className={styles.date}>
                    <i>Date of Public: {formattedDateStr}</i>
                </div>
            </div>
        </>
    );
}

export default ViewEachNews;

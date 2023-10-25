import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { getNewsById } from '~/api/newsService';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import styles from './View.module.scss';

function stripHtmlTags(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

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

    const sentences = selectedNews.content.split('. ');

    // Map sentences into paragraphs while keeping the periods and removing <p> tags
    const paragraphs = sentences.map((sentence, index) => (
        stripHtmlTags(sentence + (index < sentences.length - 1 ? '.' : ''))
    ));

    console.log(selectedNews)
    return (
        <>
            <div className={styles.imgbanner}>
                <NormalBanner />
            </div>
            <div className={styles.container}>

                <div className={styles.thumbnailContainer}>
                    <img src={selectedNews.thumbnailUrl} />
                </div>

                <div className={styles.title}>
                    <h1 >{selectedNews.title}</h1>
                </div>



                <div className={styles.shortDescription}>
                    <p><i>{selectedNews.shortDescription}</i></p>
                </div>



                <div className={styles.imgContainer}>
                    <img src={selectedNews.imgUrl} />
                </div>



                <div className={styles.ql_editor}>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>



                <div className={styles.down_content}>
                    <div className={styles.dateContainer}>
                        <div className={styles.date}>
                            <i>Date of Published: {formattedDateStr}</i>
                        </div>
                    </div>
                    <div className={styles.authorContainer}>
                        <div className={styles.author}>
                            {selectedNews.authorLastname + " " + selectedNews.authorFirstname}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewEachNews;

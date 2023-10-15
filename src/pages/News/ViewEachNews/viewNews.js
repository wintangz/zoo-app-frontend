import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { News } from './news';

function ViewEachNews(props) {
    const { id, title } = useParams();
    // const selectedNews = News.find(news => news.id === parseInt(id, 10) && encodeURIComponent(news.title) === title);
    console.log(props.title);
    const [news, setNews] = useState()
    // if (!selectedNews) {
    //     return <div>News not found</div>;
    // }

    // const { shortDescription, thumbnailUrl, createdDate } = selectedNews;
    return (
        <>
            <News />
        </>
    );
}

export default ViewEachNews;

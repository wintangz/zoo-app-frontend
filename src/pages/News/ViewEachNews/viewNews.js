import { useParams } from 'react-router-dom';
import { useAppContext } from '~/context';

function ViewEachNews() {
    const { newsResult } = useAppContext();
    const { title } = useParams();
    const selectedNews = newsResult.find(news => encodeURIComponent(news.title) === title);

    const { shortDescription, thumbnailUrl, createdDate } = selectedNews;

    return (
        <div>
            {/* <h1>{title}</h1> */}
            <p>{shortDescription}</p>
        </div>
    );
}

export default ViewEachNews;

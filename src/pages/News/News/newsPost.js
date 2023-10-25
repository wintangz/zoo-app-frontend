import { Link } from 'react-router-dom';
import DateTimeFormatComponent from '~/utils/dateTimeFormat';
import styles from './newsPost.module.scss';

function NewsPost(props) {
    const formattedTitle = props.post.title
        .toLowerCase()
        .replace(/,/g, '-')
        .replace(/ /g, '-');

    console.log(props.post.type);

    const typeStyle = {
        color: props.post.type === 'Info' ? '#ffc000' : props.post.type === 'Event' ? '#9c3' : 'inherit',
    };

    return (
        <Link to={`/news/${props.post.id}/${encodeURIComponent(formattedTitle)}`} className={styles.title}>
            <img src={props.post.thumbnailUrl} alt="Thumbnail" />
            <div className={styles.info}>
                <h3 className={styles.title_}>{props.post.title}</h3>
                <p className={styles.summary}>{props.post.shortDescription}</p>
            </div>
            <div className={styles.meta}>
                <span className={styles.date}>
                    <DateTimeFormatComponent apiDateTime={props.post.createdDate} />
                </span>
                <span className={`${styles.type} ${props.post.type}`} style={typeStyle}>{props.post.type} </span>
            </div>
        </Link>
    );
}

export default NewsPost;

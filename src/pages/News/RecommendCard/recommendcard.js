
import { Link } from 'react-router-dom';
import DateTimeFormatComponent from '~/utils/dateTimeFormat';
import styles from './recommendcard.module.scss';

function RecommendCard(props) {

    const formattedTitle = props.post.title
        .toLowerCase()
        .replace(/,/g, '-')
        .replace(/ /g, '-');

    const typeStyle = {
        color: props.post.type === 'Info' ? '#ffc000' : props.post.type === 'Event' ? '#9c3' : 'inherit',
    };
    return (
        <Link to={`/news/${props.post.id}/${encodeURIComponent(formattedTitle)}`} className={styles.container}>
            <div className={styles.item}>
                <div className={styles.imgwrap}>
                    <img src={props.post.thumbnailUrl} />
                </div>
                <h3 className={styles.title}>{props.post.title}</h3>
                <p className={styles.summary}>{props.post.shortDescription}</p>
                <div className={styles.meta}>
                    <span className={styles.date}>
                        <DateTimeFormatComponent apiDateTime={props.post.createdDate} />
                    </span>
                    <span className={styles.type} style={typeStyle}>{props.post.type}</span>
                </div>
            </div>
        </Link>
    );
}

export default RecommendCard;

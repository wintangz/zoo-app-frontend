
import DateTimeFormatComponent from '~/utils/dateTimeFormat';
import styles from './recommendcard.module.scss';

function RecommendCard(props) {
    return (
        <div className={styles.container}>
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
                    <span className={styles.type}>Event</span>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;

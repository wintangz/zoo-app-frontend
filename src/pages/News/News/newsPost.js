import DateTimeFormatComponent from '~/utils/dateTimeFormat';
import styles from './newsPost.module.scss';

function NewsPost(props) {
    return (
        <>
            <div className={styles.title}>
                <img src={props.post.thumbnailUrl} />
                <div className={styles.info}>
                    <h3>{props.post.title}</h3>
                    <p className={styles.summary}>{props.post.shortDescription}</p>
                </div>
                <div className={styles.meta}>
                    <span className={styles.date}><DateTimeFormatComponent apiDateTime={props.post.createdDate} /></span>
                    <span className={styles.type}>Event</span>
                </div>
            </div>
        </>
    );
}

export default NewsPost;

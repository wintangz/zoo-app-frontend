import classNames from 'classnames/bind';
import styles from './styles.module.scss';
const cx = classNames.bind(styles);
function NewWiddle() {
    return (
        <div className={cx('widdle-news')}>
            <div className={cx('newsContainer')}>
                <div className={cx('news-welcome')}>
                    <div className={cx('welcome')}>
                        <p>Our Latest News</p>
                    </div>
                    <div className={cx('information--title')}>
                        <h1>
                            Our Latest News & <span>Articles!</span>
                        </h1>
                    </div>
                </div>
                <div className={cx('new-decs')}>
                    <p>
                        Read and get to know more about stories by WildDale Volunteers & Wildlife <br /> experts. You
                        can share your own experience
                    </p>
                </div>
            </div>
            <div className={cx('content')}></div>
        </div>
    );
}

export default NewWiddle;

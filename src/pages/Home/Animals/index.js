import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import ImageSlider from './imageSlider.js';
import images from './postComponent.js';
import news from './newsList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Animals() {
    return (
        <div className="animal">
            <div className={cx('news')}>
                <div className={cx('news-container')}>
                    <div className={cx('content')}>
                        <div className={cx('news-welcome')}>
                            <div className={cx('welcome')}>
                                <p>Zoo Photo Gallery</p>
                            </div>
                            <div className={cx('information--title')}>
                                <h1>Zoo Photo Gallery Animals You Will Meet!</h1>
                            </div>
                        </div>
                        <ImageSlider images={images} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Animals;

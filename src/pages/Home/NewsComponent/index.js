import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '~/api/newsService';
import ImageSlider from './imageSlider.js';
import styles from './styles.module.scss';
import { formatDateTime } from '~/utils/dateTimeFormat.js';
const cx = classNames.bind(styles);
function News() {
    const [post, setPost] = useState()
    useEffect(() => {
        const res = getNews();
        res.then(result => {
            setPost(result);
        })

    }, [])
    const images = [];
    const posts = [];
    {
        post && post.slice(0).reverse().map(post => {
            if (images.length <= 4) {
                images.push({
                    id: post.id,
                    src: post.thumbnailUrl,
                    alt: post.title,
                })
            }
            if (posts.length <= 4) {
                posts.push({
                    id: post.id,
                    name: post.title,
                    date: formatDateTime(new Date(post.createdDate)),
                    path: `/news/${post.id}/${post.title}`,
                })
            }
        })
    }

    console.log(post)
    return (
        <div className={cx('news')}>
            <div className={cx('news-container')}>
                <div className={cx('content')}>
                    <div className={cx('news-welcome')}>
                        <div className={cx('welcome')}>
                            <p>Safari Tour!</p>
                        </div>
                        <div className={cx('information--title')}>
                            <h1>
                                Discover Animal <span>Way!</span>
                            </h1>
                        </div>
                    </div>
                    <div className={cx('all--news')}>
                        <div className={cx('news--left')}>
                            <ImageSlider images={images} />
                        </div>
                        <div className={cx('news--right')}>
                            <div className={cx('news--tab--list')}>
                                <p className={cx('tab--list--name')}>Latest</p>
                            </div>
                            <div className={cx('news--list')}>
                                <ul className={cx('news--ul')}>
                                    {posts.map((post) => {
                                        return (
                                            <>
                                                <li key={post.id} className={cx('news-obj')}>
                                                    <Link to={post.path}>
                                                        <p className={cx('news-name')}>{post.name}</p>
                                                        <p className={cx('news-date')}>{post.date}</p>
                                                    </Link>
                                                </li>
                                            </>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className={cx('more-btn')}>
                                <Link to="/news">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>More</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;

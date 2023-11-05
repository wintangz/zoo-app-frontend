import classNames from 'classnames/bind';
import styles from './Footer.css';

import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNews } from '~/api/newsService';
import { logo } from '~/utils/assets-src';
function Footer() {
    const [posts, setPosts] = useState();
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    useEffect(() => {
        const res = getNews();
        res.then(result => {
            setPosts(result);
        })

    }, [])
    const formatTitleForURL = (title) => {
        return title.toLowerCase().replace(/,/g, '-').replace(/ /g, '-');
    };
    const handlePostClick = (postId, postTitle) => {
        const formattedTitle = formatTitleForURL(postTitle);
        navigate(`/news/${postId}/${formattedTitle}`);
    };
    return (
        <footer className="footer text-white">
            {/* <div className="background-img">
            </div> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 left column">
                        <div className="logo">
                            <img alt="Logo" src={logo} />
                        </div>
                        <p className="text">
                            WildDale is the world largest environment organisations. We actively work towards protecting
                            wildlife, conserving habitat.
                        </p>
                        <div className="social">
                            Social Share:
                            <span className={cx('footer-icon')}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </span>
                            <span className={cx('footer-icon')}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </span>
                            <span className={cx('footer-icon')}>
                                <FontAwesomeIcon icon={faPinterestP} />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-2 column">
                        <ul className="column-title">
                            <p className="column-title">Explore</p>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/animals/Asian%20Rainforest/0">Animals</Link>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/habitats">Habitats</Link>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/map">ZooMap</Link>
                                </li>
                                <div className="line" />
                            </div>

                        </ul>
                    </div>
                    <div className="col-md-2 column">
                        <ul className="column-title">
                            <p className="column-title">Useful Links</p>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/news">News</Link>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/ticket">Ticket</Link>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <Link to="/about">About us</Link>
                                </li>
                                <div className="line" />
                            </div>

                        </ul>
                    </div>
                    <div className="col-md-4 column">
                        <h2 className="column-title">Recent Posts</h2>
                        {posts && posts.slice(-2).map((post, index) => (
                            <div key={post.id} className={cx({
                                [`${cx('recent-posts1')}`]: index === 0,
                                [`${cx('recent-posts')}`]: true,
                            })}>
                                <div className={cx('recent-posts-img')} style={{ background: `url(${post.thumbnailUrl}) no-repeat`, backgroundSize: 'cover' }} onClick={() => handlePostClick(post.id, post.title)}
                                ></div>
                                <div className={cx('recent-content')}>
                                    <Link to={`/news/${post.id}/${formatTitleForURL(post.title)}`} className="recent-title">
                                        {post.title}
                                    </Link>
                                    <p className="recent-date">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </span>
                                        {post.createdDate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="viewmap">
                    <Link className="viewmapbutton" to={"/maps"}>
                        View Maps!
                        <span>
                            <FontAwesomeIcon icon={faMap} />
                        </span>
                    </Link>
                </div>
                <div className="authorize">
                    <div className="copy-right">
                        <div className="copy-right-text footer-left">
                            Copyright © 2023 <a href="google.com">ValtSaiGon</a> Theme. All rights reserved.
                        </div>
                        <div className="footer-right">
                            <div className="copy-right-text ">
                                <a href="google.com">About Us</a> <div className="copy-button" />
                            </div>
                            <div className="copy-right-text ">
                                <a href="google.com">Gallery</a> <div className="copy-button" />
                            </div>
                            <div className="copy-right-text ">
                                <a href="google.com">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

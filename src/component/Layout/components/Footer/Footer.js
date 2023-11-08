import classNames from 'classnames/bind';
import styles from './Footer.css';

import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNews } from '~/api/newsService';
import { logo } from '~/utils/assets-src';
import { formatDateTime } from '~/utils/dateTimeFormat';

function Footer() {
    const [posts, setPosts] = useState();
    const navigate = useNavigate();
    const cx = classNames.bind(styles);

    useEffect(() => {
        const res = getNews();
        res.then(result => {
            setPosts(result);
        });
    }, []);

    const formatTitleForURL = (title) => {
        return title.toLowerCase().replace(/,/g, '-').replace(/ /g, '-');
    };

    const handlePostClick = (postId, postTitle) => {
        const formattedTitle = formatTitleForURL(postTitle);
        navigate(`/news/${postId}/${formattedTitle}`);
    };

    return (
        <footer className="footer text-white bg-black">
            <div className="container mx-auto pt-8 pb-4">
                <div className="grid grid-cols-4 gap-4 mx-7">
                    <div className="w-4 ml-5">
                        <div className="">
                            <div className="w-5">
                                <img alt="Logo" src={logo} />
                            </div>
                            <p className="text text-gray-400 mt-3">
                                WildDale is the world's largest environmental organization. We actively work towards protecting wildlife and conserving habitats.
                            </p>
                            <div className="social mt-4">
                                Social Share:
                                <span className="footer-icon mx-2">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </span>
                                <span className="footer-icon mx-2">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </span>
                                <span className="footer-icon mx-2">
                                    <FontAwesomeIcon icon={faPinterestP} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5">
                        <div className="column-title text-white text-lg font-semibold mb-4">Explore</div>
                        <ul className="footer-list space-y-5 text-sm">
                            <li className="footer-list-text">
                                <Link to="/animals/Asian%20Rainforest/0" className="text-gray-300 hover:text-white">Animals</Link>
                            </li>
                            <li className="footer-list-text">
                                <Link to="/habitats" className="text-gray-300 hover:text-white">Habitats</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-5">
                        <div className="column-title text-white text-lg font-semibold mb-4">Useful Links</div>
                        <ul className="footer-list space-y-5 text-sm">
                            <li className="footer-list-text">
                                <Link to="/news" className="text-gray-300 hover:text-white">News</Link>
                            </li>
                            <li className="footer-list-text">
                                <Link to="/ticket" className="text-gray-300 hover:text-white">Ticket</Link>
                            </li>
                            <li className="footer-list-text">
                                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-7">
                        <div className="column-title text-white text-lg font-semibold mb-4">Recent Posts</div>
                        {posts && posts.slice(-2).map((post, index) => (
                            <div key={post.id} className={cx({
                                [`${cx('recent-posts1')}`]: index === 0,
                                [`${cx('recent-posts')}`]: true,
                            })}>
                                <div className={cx('recent-posts-img')} style={{ background: `url(${post.thumbnailUrl}) no-repeat`, backgroundSize: 'cover', width: "100px", height: "100px" }} onClick={() => handlePostClick(post.id, post.title)}
                                ></div>
                                <div className={cx('recent-content')} style={{ maxWidth: "272px" }}>
                                    <Link to={`/news/${post.id}/${formatTitleForURL(post.title)}`} className="recent-title text-white hover:text-gray-300">
                                        {post.title}
                                    </Link>
                                    <p className="recent-date text-gray-300">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </span>
                                        {formatDateTime(new Date(post.createdDate))}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="viewmap"></div>
            <div className="authorize mb-5">
                <div className="flex justify-between">
                    <div className="copy-right-text footer-left text-gray-400">
                        Copyright © 2023 <Link to="/" className="text-gray-400 hover:text-white">ValtSaiGon</Link> Theme. All rights reserved.
                    </div>
                    <div className="footer-right flex space-x-4 text-gray-400 mr-20">
                        <div className="copy-right-text">
                            <Link to="/about" className="hover:text-white">About Us</Link>
                        </div>
                        <div className="copy-right-text">
                            <Link to="/habitats" className="hover:text-white">Gallery</Link>
                        </div>
                        <div className="copy-right-text">
                            <Link to="/about" className="hover:text-white">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

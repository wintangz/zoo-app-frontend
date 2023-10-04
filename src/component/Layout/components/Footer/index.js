import classNames from 'classnames/bind';
import styles from './Footer.css';
// import logo from '~/assets/img/logo-01.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import { logo } from '~/assets/all';
function Footer() {
    const cx = classNames.bind(styles);
    return (
        <footer className="footer text-white">
            <div className="background-img">
                <img src='https://previews.dropbox.com/p/thumb/ACDMTN-kKNgomdSpo4NDrPbbz5dENNH6pY1rmvT8rs8_t8OPKpk_Rab6uQwqtX2IEPkweJm4fkMN0xJoora0mYUeraEJ8OMcRMCODg36CXiVuaeU003zRDBJjVv7ITXPQOU00ncthCBtcQ5tXr02u9YWQ93DWdqifUjerzY7fq59ShUn3vIDGnsqY6xolbmZONUUeN-wu7AMSgaz0q6oykFy9sFaABlwsImgKuLtc-Ia5Oakk2JEFAebiaQ4OXEOAEi3PC_0A7SjU4iu4clIhKSRJn7JlJlrYwxeTpvAa0CYvmgPg1HuXgayUQ9_KJ54cEN1VxIZDRPrGHlzO_yVYZcN/p.png' alt='' />
            </div>
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
                                    <a href="google.coms">About Us</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.coms">About Us</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.coms">About Us</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.coms">About Us</a>
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
                                    <a href="google.com">Useful Links</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.com">Useful Links</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.com">Useful Links</a>
                                </li>
                                <div className="line" />
                            </div>
                            <div className="footer-list">
                                <li className="footer-list-text">
                                    <a href="google.com">Useful Links</a>
                                </li>
                                <div className="line" />
                            </div>
                        </ul>
                    </div>
                    <div className="col-md-4 column">
                        <h2 className="column-title ">Recent Posts</h2>
                        <div className={cx('recent-posts1') + ' ' + cx('recent-posts')}>
                            <div className={cx('recent-posts-img')}></div>
                            <div className={cx('recent-content')}>
                                <a className="recent-title" href="google.com">
                                    10 Amazing Wildlife Travel Adventures To Try!
                                </a>
                                <p className="recent-date">
                                    <span>
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </span>
                                    August 10, 2021
                                </p>
                            </div>
                        </div>
                        <div className={cx('recent-posts2') + ' ' + cx('recent-posts')}>
                            <div className={cx('recent-posts-img')}></div>
                            <div className={cx('recent-content')}>
                                <a className="recent-title" href="google.com">
                                    Everything Need To Know About Tigers Census
                                </a>
                                <p className="recent-date">
                                    <span>
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </span>
                                    August 10, 2021
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="viewmap">
                    <a className="viewmapbutton" href="/maps">
                        View Maps!
                        <span>
                            <FontAwesomeIcon icon={faMap} />
                        </span>
                    </a>
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

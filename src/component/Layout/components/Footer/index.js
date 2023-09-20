import classNames from 'classnames/bind';
import styles from './Footer.css';
import logo from '~/assets/img/logo-final.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-solid-svg-icons';
function Footer() {
    const cx = classNames.bind(styles);
    return (
        <footer class="footer text-white test">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 left column">
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
                    <div class="col-md-2 column">
                        <ul class="column-title">
                            <p className="column-title">Explore</p>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>About Us</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>About Us</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>About Us</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>About Us</a></li><div className='line'/></div>
                        </ul>
                    </div>
                    <div class="col-md-2 column">
                        <ul class="column-title">
                            <p className="column-title">Useful Links</p>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>Useful Links</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>Useful Links</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>Useful Links</a></li><div className='line'/></div>
                            <div className='footer-list'><li className='footer-list-text'><a href='#'>Useful Links</a></li><div className='line'/></div>
                        </ul>
                    </div>
                    <div class="col-md-4 column">
                        <h2 class="column-title ">Recent Posts</h2>
                        <div className={cx('recent-posts1') + ' ' + cx('recent-posts')}>
                            <div className={cx('recent-posts-img')}></div>
                            <div className={cx('recent-content')}>
                                <a className="recent-title" href="#">
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
                                <a className="recent-title" href="#">
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
                <div class="viewmap">
                    <a class="viewmapbutton">
                        View Maps!
                        <span>
                            <FontAwesomeIcon icon={faMap} />
                        </span>
                    </a>
                </div>
                <div class="authorize">
                    <div className="copy-right">
                        <div class="copy-right-text footer-left">Copyright © 2023 <a href='#'>WildDale</a> Theme. All rights reserved.</div>
                        <div className='footer-right'>
                            <div class="copy-right-text "><a href='#'>About Us</a> <div className='copy-button'/></div>
                            <div class="copy-right-text "><a href='#'>Gallery</a> <div className='copy-button' /></div>
                            <div class="copy-right-text "><a href='#'>Contact Us</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

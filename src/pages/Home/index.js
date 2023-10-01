import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import images from './NewsComponent/postComponent.js';
import ImageSlider from './NewsComponent/imageSlider.js';
import { zones } from './zoneComponents.js';
import news from './NewsComponent/newsList';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const cx = classNames.bind(styles);
    return (
        <>
            {/* <DefaultLayout /> */}
            <div className={cx('home--container')}>
                <div className={cx('infomation--content')}>
                    <div className={cx('information')}>
                        <div className={cx('information--left')}>
                            <div className={cx('welcome')}>
                                <p>Welcome To SaiGon Zoo</p>
                            </div>
                            <div className={cx('information--title')}>
                                <h1>
                                    Words About Best Animal Worlds <span>Big Zoo.</span>
                                </h1>
                            </div>
                            <div className={cx('information--decs')}>
                                <p>
                                    The Wildlife conservation is long term commitment and journey that requires the
                                    cooperation of everyone in the community. We are very much evolved into practice of
                                    creating better place.
                                </p>
                            </div>
                            <div className={cx('information--table')}>
                                <div className={cx('information--table--front')}>
                                    <div className={cx('table--front')}>
                                        <h2 className={cx('title')}>Wildlife Conservation</h2>
                                        <p className={cx('content')}>
                                            Saving nature is at the very heart
                                            <br />
                                            of what we do as WildDale.
                                        </p>
                                    </div>
                                    <div className={cx('table--front')}>
                                        <h2 className={cx('title')}>Save Wildlife Habitat</h2>
                                        <p className={cx('content')}>
                                            We want to make life better place
                                            <br />
                                            for animals living in the wild
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('information--table--down')}>
                                    <div className={cx('table--down')}>
                                        <h2 className={cx('title')}>Interruption of Nature</h2>
                                        <p className={cx('content')}>
                                            Investigates nature interruption in
                                            <br />
                                            relevance ways of practice!
                                        </p>
                                    </div>
                                    <div className={cx('table--down')}>
                                        <h2 className={cx('title')}>A Safari Volunteering</h2>
                                        <p className={cx('content')}>
                                            A friendly way to travel and share
                                            <br />
                                            spaces with majestic animals
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('information--buttons')}>
                                <Link to="/about">More About Us!</Link>
                                <Link to="/contact">Contact Us!</Link>
                            </div>
                        </div>
                        <div className={cx('information--right')}>
                            <div className={cx('information--img')}>
                                <div className={cx('information--img--background')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('zone')}>
                <div className={cx('zone--welcome')}>
                    <div className={cx('welcome')}>
                        <p>Safari Tour!</p>
                    </div>
                    <div className={cx('information--title')}>
                        <h1>
                            Discover Animal <span>Way!</span>
                        </h1>
                    </div>
                </div>
                {zones.map((component) => {
                    return (
                        <div className={cx('zone--container')}>
                            <div
                                className={cx('zone--background')}
                                style={{
                                    background: 'url(' + component.imgUrl + ')',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                            <div className={cx('zone--title')}>{component.name}</div>
                            <div className={cx('zone--title-hover')}></div>
                            <div
                                className={cx('zone--hover')}
                                style={{
                                    background: 'url(' + component.hoverImage + ') no-repeat',
                                    backgroundSize: 'cover',
                                    right: '7%',
                                    width: '50%',
                                    height: '100%',
                                    position: 'absolute',
                                    opacity: 0,
                                }}
                            ></div>
                            <styles></styles>
                        </div>
                    );
                })}
            </div>

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
                                        {news.map((post) => {
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
        </>
    );
}

export default Home;

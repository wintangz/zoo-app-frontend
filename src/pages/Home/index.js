import classNames from 'classnames/bind';
import styles from './Home.module.scss';
function Home() {
    const cx = classNames.bind(styles);
    return (
        <>
            {/* <DefaultLayout /> */}
            <div className={cx('home--container')}>
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
                                        Saving nature is at the very heart of what we do as WildDale.
                                    </p>
                                </div>
                                <div className={cx('table--front')}>
                                    <h2 className={cx('title')}>Save Wildlife Habitat</h2>
                                    <p className={cx('content')}>
                                        We want to make life better place for animals living in the wild
                                    </p>
                                </div>
                            </div>
                            <div className={cx('information--table--down')}>
                                <div className={cx('table--down')}>
                                    <h2 className={cx('title')}>Interruption of Nature</h2>
                                    <p className={cx('content')}>
                                        Investigates nature interruption in relevance ways of practice!
                                    </p>
                                </div>
                                <div className={cx('table--down')}>
                                    <h2 className={cx('title')}>A Safari Volunteering</h2>
                                    <p className={cx('content')}>
                                        A Safari Volunteering A friendly way to travel and share spaces with majestic
                                        animals
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('information--right')}>
                        <div className={cx('information--imgae')}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

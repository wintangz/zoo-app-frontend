import classNames from 'classnames/bind';
import styles from './Home.module.scss';
function Home() {
    const cx = classNames.bind(styles);
    return (
        <>
            {/* <DefaultLayout /> */}
            <div class="home--container">
                <div className={cx('information')}>
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
                            The Wildlife conservation is long term commitment and journey that requires the cooperation
                            of everyone in the community. We are very much evolved into practice of creating better
                            place.
                        </p>
                    </div>
                    <div className={cx('information--table')}>
                        <div className={cx('information--table--front')}>
                            <div className={cx('table--front')}>
                                <h2 className={cx('title')}></h2>
                                <p className={cx('content')}></p>
                            </div>
                            <div className={cx('table--front')}>
                                <h2 className={cx('title')}></h2>
                                <p className={cx('content')}></p>
                            </div>
                        </div>
                        <div className={cx('information--table--down')}>
                            <div className={cx('table--down')}></div>
                            <div className={cx('table--down')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

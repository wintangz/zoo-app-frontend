import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BannerPageContext, NamePageContext } from '~/App';
import styles from './NormalBanner.module.scss';
function NormalBanner() {
    const NamePage = useContext(NamePageContext);
    const BannerPage = useContext(BannerPageContext);
    console.log(NamePage);
    const cx = classNames.bind(styles);
    return (
        <div className={cx('container')}>
            <div
                className={cx('banner--container')}
                style={{
                    background: 'url(' + BannerPage + ') no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className={cx('overlay')} />
                <div className={cx('banner--text')}>
                    <h1 className={cx('banner--title')}>{NamePage}</h1>
                    <div >
                        <h3 className={cx('banner--nav')}>
                            <Link className={cx('banner--nav--home')} to={'/'}>
                                <span className={cx('nav--home--icon')}><FontAwesomeIcon icon={faHouse} /></span>
                                <p className={cx('nav--home--text')}>Home</p>
                            </Link>
                            <div className={cx('line')}>­</div>
                            <p className={cx('nav--cur')}>{NamePage}</p>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NormalBanner;

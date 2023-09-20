import classNames from 'classnames/bind';
import styles from './NormalBanner.module.scss';
import { useContext } from 'react';
import { NamePageContext, BannerPageContext } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
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
                            <span><FontAwesomeIcon icon={faHouse}/></span>
                            <p>House</p>
                            <div className={cx('line')}/>
                            <p>{NamePage}</p>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NormalBanner;

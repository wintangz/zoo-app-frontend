import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { zones } from './zoneComponents.js';
const cx = classNames.bind(styles);
function Zone() {
    return (
        <div className={cx('zone')}>
            {/* <div className={cx('zone--welcome')}>
                <div className={cx('welcome')}>
                    <p>Safari Tour!</p>
                </div>
                <div className={cx('information--title')}>
                    <h1>
                        Discover Animal <span>Way!</span>
                    </h1>
                </div>
            </div> */}
            {zones.map((component) => {
                return (
                    <div className={cx('zone--container')}>
                        <div className={cx('overlay')}></div>
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
    );
}

export default Zone;

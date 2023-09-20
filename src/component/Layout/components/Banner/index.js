import banner from '~/assets/img/banner.jpg';
import styles from './Banner.css';
import classNames from 'classnames/bind';
function Banner() {
    const cx = classNames.bind(styles);
    return (
        <div class="container-fluid">
            <div class="banner row">
                <img src={banner} alt='banner' className={cx('banner')} />
            </div>
        </div>
    );
}

export default Banner;

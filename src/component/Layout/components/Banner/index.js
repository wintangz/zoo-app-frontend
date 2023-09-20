import banner from '~/assets/img/banner.jpg';
import styles from './Banner.css';

function Banner() {
    return (
        <div class="container-fluid">
            <div class="banner row">
                <img src={banner} />
            </div>
        </div>
    );
}

export default Banner;

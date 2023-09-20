import classNames from 'classnames/bind';
import styles from './Footer.css';
import logo from '~/assets/img/logo-final.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <footer class="footer text-white test">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 left">
                        <div className="logo">
                            <img alt="Logo" src={logo} />
                        </div>
                        <p class="text">
                            WildDale is the world largest environment organisations. We actively work towards protecting
                            wildlife, conserving habitat.
                        </p>
                        <h2 class="social">Social Share:</h2>
                    </div>
                    <div class="col-md-2 column">
                        <h2 class="column-title">Explore</h2>
                        <p>About Us</p>
                        <p>About Us</p>
                        <p>About Us</p>
                        <p>About Us</p>
                    </div>
                    <div class="col-md-2 column">
                        <h2 class="column-title">Useful Links</h2>
                        <p>About Us</p>
                        <p>About Us</p>
                        <p>About Us</p>
                        <p>About Us</p>
                    </div>
                    <div class="col-md-4">
                        <h2 class="column-title">Recent Posts</h2>
                    </div>
                </div>
                <div class="viewmap">
                    <a class="viewmapbutton">View Maps!</a>
                </div>
                <div class="row last">
                    <div class="col-md-6">Copyright</div>
                    <div class="col-md-6 text-right">About Us</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

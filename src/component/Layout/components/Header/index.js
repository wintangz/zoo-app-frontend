// import classNames from 'classnames/bind';
// import styles from './Header.module.scss';
// import logo from '~/assets/img/logo-final.svg';
// import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

// import { components } from './components';
// import { Fragment } from 'react';
// const cx = classNames.bind(styles);
// function Header() {
//     return (
//         <header className={cx('wrapper')}>
//             <div className={cx('header--logo')}>
//                 <img alt="Logo" className={cx('header--logo--img')} src={logo} />
//             </div>
//             <div className={cx('nav')}>
//                 <ul className={cx('nav--menu--main')}>
//                     {components.map((component, index) => {
//                         //Check if the component have sub navigation will create sub

//                         if (component.sub) {
//                             // Check sub is existing
//                             return (
//                                 <Fragment>
//                                     <li key={index} className={cx('nav--menu--sub') + ' ' + cx('menu--sub')}>
//                                         {component.name}
//                                         <ul className={cx('sub--menu')}>
//                                             {component.sub.map((object, index) => {
//                                                 // Map to get all sub components
//                                                 return (
//                                                     <Fragment>
//                                                         <li key={index} className={cx('sub--menu--object')}>
//                                                             <Link to={object.path}>{object.name}</Link>
//                                                         </li>
//                                                     </Fragment>
//                                                 );
//                                             })}
//                                         </ul>
//                                     </li>
//                                 </Fragment>
//                             );
//                         } else {
//                             // no sub will be rendered
//                             return (
//                                 <li key={index} className={cx('nav--menu--sub')}>
//                                     <Link to={component.path}>{component.name}</Link>
//                                 </li>
//                             );
//                         }
//                     })}
//                 </ul>
//                 <div href="" className={cx('nav--menu--cart') + ' ' + cx('nav--menu--sub')}>
//                     <span className={cx('cart--icon')}>
//                         <FontAwesomeIcon icon={faCartShopping} style={{ color: '#ffffff' }} />
//                     </span>
//                 </div>
//                 <div className={cx('nav--menu--login') + ' ' + cx('nav--menu--sub')}>
//                     <a className={cx('login-btn')} href="/#">
//                         Login
//                     </a>
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import LoginForm from '../LoginForm/loginform';
import { useState } from 'react';
// import logo from '~/assets/img/logo-01.png';

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <header className={styles.container}>
                <div className={styles.logo}>
                    <img src="https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/LOGO-LONG.png" alt="" />
                </div>
                <div className={styles.navwrap}>
                    <div className={styles.navbar}>
                        <Link to="/" className={styles.navitem}>
                            Home
                        </Link>
                        <Link to="/news" className={styles.navitem}>
                            News
                        </Link>
                        <Link to="/animals" className={styles.navitem}>
                            Animals
                        </Link>
                        <Link to="/gallery" className={styles.navitem}>
                            Gallery
                        </Link>
                        <Link to="/about" className={styles.navitem}>
                            About
                        </Link>
                    </div>
                </div>
                <div className={styles.login}>
                    <Link onClick={() => setOpen(true)} className={`${styles.loginitem} ${styles.js_open}`}>
                        Log In
                    </Link>
                </div>
            </header>

            {open && <LoginForm open={setOpen} />}
        </>
    );
}

export default Header;

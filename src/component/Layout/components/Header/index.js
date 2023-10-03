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
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { logoLong } from '~/assets/all';
import { components } from './components.js';
import { NamePageContext } from '~/App';
function Header() {
    const [open, setOpen] = useState(false);
    const NamePage = useContext(NamePageContext);
    useEffect(() => {
        // Use document.querySelectorAll to select all elements with the class
        const headerNavItems = document.querySelectorAll('.Header_navitem_container__Sy6hN');

        // Check if any elements were found
        if (headerNavItems.length > 0) {
            // Loop through the NodeList (similar to an HTMLCollection) using forEach
            headerNavItems.forEach((element, index) => {
                if (element.textContent === NamePage) {
                    element.classList.add(styles.active);
                    console.log(element)
                } else {
                    element.classList.remove(styles.active);
                }
                // Access the text content or perform other actions with the element
            });
        }
        return () => {
            headerNavItems.forEach((element) => {
                element.classList.remove(styles.active);
            });
        }

    }, [NamePage]);
    return (
        <>
            <header className={styles.container}>
                <div className={styles.logo}>
                    <img src={logoLong} alt="" />
                </div>
                <div className={styles.navwrap}>
                    <div className={styles.navbar}>
                        {/* <div className={styles.navitem_container}>
                            <Link to="/" className={styles.navitem}>
                                Home
                            </Link>
                        </div>
                        <div className={styles.navitem_container}>
                            <Link to="/news" className={styles.navitem}>
                                News
                            </Link>
                        </div>
                        <div className={styles.navitem_container}>
                            <div className={styles.navitem}>
                                <span>Explore</span>
                                <FontAwesomeIcon icon={faCaretDown} />
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdown_item_container}>
                                        <Link to="/animals/1" className={styles.dropdown_item}>
                                            Animals
                                        </Link>
                                    </div>
                                    <div className={styles.dropdown_item_container}>
                                        <Link to="/habitats" className={styles.dropdown_item}>
                                            Habitats
                                        </Link>
                                    </div>
                                    <div className={styles.dropdown_item_container}>
                                        <Link to="/maps" className={styles.dropdown_item}>
                                            Zoo Map
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.navitem_container}>
                            <Link to="/ticket" className={styles.navitem}>
                                Ticket
                            </Link>
                        </div>
                        <div className={styles.navitem_container}>
                            <Link to="/about" className={styles.navitem}>
                                About
                            </Link>
                        </div> */}
                        {components.map((component, index) => {
                            if (component.sub) {
                                return (
                                    <div key={index} name={component.name} className={styles.navitem_container}>
                                        <div key={index} className={styles.navitem}>
                                            <span>{component.name}</span>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                            <div key={index} className={styles.dropdown}>
                                                {component.sub.map((subObj, index) => {
                                                    return (
                                                        <div key={index} className={styles.dropdown_item_container}>
                                                            <Link to={subObj.path} className={styles.dropdown_item}>
                                                                {subObj.name}
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div name={component.name} className={styles.navitem_container}>
                                        <Link to={component.path} className={styles.navitem}>
                                            {component.name}
                                        </Link>
                                    </div>
                                )
                            }
                        })}
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

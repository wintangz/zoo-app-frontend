import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/img/logo-final.svg';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { components } from './components';
import { Fragment } from 'react';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header--logo')}>
                <img alt="Logo" className={cx('header--logo--img')} src={logo} />
            </div>
            <div className={cx('nav')}>
                <ul className={cx('nav--menu--main')}>
                    {components.map((component, index) => {
                        //check sub
                        if (component.sub) {
                            return (
                                <Fragment>
                                    <li key={index} className={cx('nav--menu--sub') + ' ' + cx('menu--sub')}>
                                        {component.name}
                                        <ul className={cx('sub--menu')}>
                                            {component.sub.map((object, index) => {
                                                return (
                                                    <Fragment>
                                                        <li key={index} className={cx('sub--menu--object')}>
                                                            <Link to={object.path}>{object.name}</Link>
                                                        </li>
                                                    </Fragment>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                </Fragment>
                            );
                        } else {
                            return (
                                <li key={index} className={cx('nav--menu--sub')}>
                                    <Link to={component.path}>{component.name}</Link>
                                </li>
                            );
                        }
                    })}
                </ul>
                <div href="" className={cx('nav--menu--cart') + ' ' + cx('nav--menu--sub')}>
                    <span className={cx('cart--icon')}>
                        <FontAwesomeIcon icon={faCartShopping} style={{ color: '#ffffff' }} />
                    </span>
                </div>
                <div className={cx('nav--menu--giveTicket') + ' ' + cx('nav--menu--sub')}>
                    <a href="/#">Get a Ticket</a>
                </div>
            </div>
        </header>
    );
}

export default Header;

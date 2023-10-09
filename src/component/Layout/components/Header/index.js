import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NamePageContext } from '~/App';
import { logo_long } from '~/utils/assets-src';
import LoginForm from '../LoginForm/loginform';
import RegisterForm from '../RegisterForm/index';
import styles from './Header.module.scss';
import { components } from './components.js';
function Header() {
    const [open, setOpen] = useState(false);
    const NamePage = useContext(NamePageContext);
    const lineRef = useRef(null);
    useEffect(() => {
        const headerNavItems = document.querySelectorAll(`.${styles.navitem_container}`);
        const child = document.querySelectorAll(`.${styles.dropdown_item}`);
        if (headerNavItems.length > 0) {
            // Loop through the NodeList (similar to an HTMLCollection) using forEach
            console.log(NamePage);
            headerNavItems.forEach((element, index) => {
                if (typeof (NamePage) === 'undefined' || NamePage === "Maps" || NamePage === "Habitats") {
                    if (element.textContent === "ExploreAnimalsHabitatsZooMap") {
                        element.classList.add(styles.active);
                    }
                } else if (NamePage === "Summary") {
                    if (element.textContent === "Ticket") {
                        element.classList.add(styles.active);
                    }
                } else if (element.textContent === NamePage) {
                    element.classList.add(styles.active);
                }
            });
        }
        return () => {
            headerNavItems.forEach((element) => {
                element.classList.remove(styles.active);
            });
        }

    }, [NamePage]);
    useEffect(() => {
        const headerNavItems = document.querySelectorAll(`.${styles.active}`);
        headerNavItems.forEach((element) => {
            const name = element.textContent;
            switch (name) {
                case "Home": { lineRef.current.style.left = '45.5%'; lineRef.current.style.width = '5.8%'; break; }
                case "News": { lineRef.current.style.left = '53.5%'; lineRef.current.style.width = '5.8%'; break; }
                case "ExploreAnimalsHabitatsZooMap": { lineRef.current.style.left = '61%'; lineRef.current.style.width = '6.3%'; break; }
                case "Ticket": { lineRef.current.style.left = '69.6%'; lineRef.current.style.width = '5.8%'; break; }
                case "About": { lineRef.current.style.left = '77.6%'; lineRef.current.style.width = '5.8%'; break; }
            }
        })
    }, [])
    const handleHover = (element) => {
        // Move the .line element to the hovered element
        // lineRef.current.style.left = `${element.offsetLeft}px`;
        switch (element) {
            case "Home": { lineRef.current.style.left = '45.5%'; lineRef.current.style.width = '5.8%'; break; }
            case "News": { lineRef.current.style.left = '53.5%'; lineRef.current.style.width = '5.8%'; break; }
            case "Explore": { lineRef.current.style.left = '61%'; lineRef.current.style.width = '6.3%'; break; }
            case "Ticket": { lineRef.current.style.left = '69.6%'; lineRef.current.style.width = '5.8%'; break; }
            case "About": { lineRef.current.style.left = '77.6%'; lineRef.current.style.width = '5.8%'; break; }
        }
    };
    const handleUnHover = (element) => {
        document.querySelector(`.${styles.active}`).classList.contains("Home");
        if (document.querySelector(`.${styles.active}`).classList.contains("Home")) {
            lineRef.current.style.left = '45.5%'; lineRef.current.style.width = '5.8%';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("News")) {
            lineRef.current.style.left = '53.5%'; lineRef.current.style.width = '5.8%';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("Explore")) {
            lineRef.current.style.left = '61%'; lineRef.current.style.width = '6.3%';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("Ticket")) {
            lineRef.current.style.left = '69.6%'; lineRef.current.style.width = '5.8%';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("About")) {
            lineRef.current.style.left = '77.6%'; lineRef.current.style.width = '5.8%';
        }
    }

    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openRegisterForm, setOpenRegisterForm] = useState(false);

    return (
        <>
            <header className={styles.container}>
                <div className={styles.logo}>
                    <img src={logo_long} alt="" />
                </div>
                <div className={styles.navwrap}>
                    <div className={styles.navbar}>
                        <div className={styles.line} ref={lineRef} />
                        {components.map((component, index) => {
                            if (component.sub) {
                                return (
                                    <div key={index}
                                        className={`${styles.navitem_container} ${styles["item_" + index]}` + " " + component.name}
                                        onMouseEnter={() => handleHover(component.name)}
                                        onMouseLeave={() => handleUnHover(index)}
                                    >
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
                                    <div name={component.name}
                                        className={`${styles.navitem_container} ${styles["item_" + index]}` + " " + component.name}
                                        onMouseEnter={() => handleHover(component.name)}
                                        onMouseLeave={() => handleUnHover(index)}
                                    >
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
                    <Link onClick={() => setOpenLoginForm(true)} className={`${styles.loginitem} ${styles.js_open}`}>
                        Log In
                    </Link>
                </div>
            </header>

            {open && <LoginForm open={setOpen} />}
            {openRegisterForm && <RegisterForm setOpenLoginForm={setOpenLoginForm} setOpenRegisterForm={setOpenRegisterForm} />}
            {openLoginForm && <LoginForm open={setOpenLoginForm} setOpenRegisterForm={setOpenRegisterForm} />}
        </>
    );
}

export default Header;

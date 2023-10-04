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
    const lineRef = useRef(null);
    useEffect(() => {
        // Use document.querySelectorAll to select all elements with the class
        const headerNavItems = document.querySelectorAll(`.${styles.navitem_container}`);
        // Check if any elements were found
        if (headerNavItems.length > 0) {
            // Loop through the NodeList (similar to an HTMLCollection) using forEach
            headerNavItems.forEach((element, index) => {
                if (element.textContent === NamePage) {
                    element.classList.add(styles.active);
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
    useEffect(() => {
        lineRef.current.style.left = "47.5%";
    }, [])
    const handleHover = (element) => {
        // Move the .line element to the hovered element
        // lineRef.current.style.left = `${element.offsetLeft}px`;
        switch (element) {
            case "Home": { lineRef.current.style.left = '47.5%'; lineRef.current.style.width = '38px'; break; }
            case "News": { lineRef.current.style.left = '55.5%'; lineRef.current.style.width = '38px'; break; }
            case "Explore": { lineRef.current.style.left = '62%'; lineRef.current.style.width = '80px'; break; }
            case "Ticket": { lineRef.current.style.left = '71.2%'; lineRef.current.style.width = '42px'; break; }
            case "About": { lineRef.current.style.left = '79%'; lineRef.current.style.width = '45px'; break; }
        }
    };
    const handleUnHover = (element) => {
        document.querySelector(`.${styles.active}`).classList.contains("Home");
        if (document.querySelector(`.${styles.active}`).classList.contains("Home")) {
            lineRef.current.style.left = '47.5%'; lineRef.current.style.width = '38px';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("News")) {
            lineRef.current.style.left = '55.5%'; lineRef.current.style.width = '38px';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("Explore")) {
            lineRef.current.style.left = '62%'; lineRef.current.style.width = '80px';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("Ticket")) {
            lineRef.current.style.left = '71.2%'; lineRef.current.style.width = '42px';
        } else if (document.querySelector(`.${styles.active}`).classList.contains("About")) {
            lineRef.current.style.left = '79%'; lineRef.current.style.width = '45px';
        }
    }
    return (
        <>
            <header className={styles.container}>
                <div className={styles.logo}>
                    <img src={logoLong} alt="" />
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

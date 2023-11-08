import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '~/component/Layout/components/ForgotPassword/ForgotPassword';
import LoginForm from '~/component/Layout/components/LoginForm/Loginform';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import RegisterForm from '~/component/Layout/components/RegisterForm/RegisterForm';
import { useAppContext } from '~/context/Context';
import styles from './Ticket.module.scss';
import TicketDetail from './TicketDetail';


export const TicketContext = createContext();
function Ticket() {
    const { setTotalQuantity, setTotalPrice, totalPrice, tickets } = useAppContext();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const handleLoginFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
    };
    const handleRegisterFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(false);
        setShowRegister(true);
        setShowForgotPassword(false);
    };
    const handleForgotPasswordFormClick = (event) => {
        event.stopPropagation();
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
    };
    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleCloseRegister = () => {
        setShowRegister(false);
    };
    const handleCloseForgotPassword = () => {
        setShowForgotPassword(false);
    };
    const handleIncreaseQuantity = (price) => {
        setTotalQuantity(prev => prev + 1)
        setTotalPrice(prev => prev + Number(price))
    }
    const handleReduceQuantity = (price) => {
        setTotalQuantity(prev => prev - 1)
        setTotalPrice(prev => prev - Number(price))
    }
    console.log(tickets);
    return (
        <>
            <div className={styles.imgbanner}>
                <NormalBanner />
            </div>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.welcome}>Welcome to SaiGon</div>
                    <div className={styles.welcome_description}>Get Zoo Ticket Now!!!</div>
                </div>
            </div>
            <div style={{ textAlign: "center", fontSize: "1.5rem", paddingBottom: "2rem", color: "red" }}>* Ticket is available for 30 days after purchase.  </div>
            <div className={styles.table_container}>
                <table className={styles.table}>
                    <tr className={styles.table_row}>
                        <th className={styles.table_header}>Ticket Type</th>
                        <th className={styles.table_header}>Price</th>
                        <th className={styles.table_header}>Quantity</th>
                    </tr>
                    {tickets && tickets.map(ticket => {
                        if (ticket.status) {
                            return (
                                <TicketDetail
                                    ticket={ticket}
                                    increaseQuantity={(price) => handleIncreaseQuantity(price)}
                                    reduceQuantity={(price) => handleReduceQuantity(price)}
                                />
                            );
                        }
                        return null;
                    })}

                    <tr className={`${styles.table_row} ${styles.total}`}>
                        <td colSpan='4' className={styles.table_data}>
                            <b>Total Price: {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</b>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={styles.buy}>
                {/* {auth ? <Link to="/summary" className={styles.btn}>Checkout</Link>
                    : <Link onClick={() => setOpen(true)} className={styles.btn}>Checkout</Link>
                } */}
                <Link to={localStorage.getItem("token") && totalPrice != null && totalPrice !== 0 ? "/summary" : undefined} onClick={localStorage.getItem("token") ? undefined : (event) => handleLoginFormClick(event)} className={styles.btn}>
                    Check Out
                </Link>
                {showLogin && <LoginForm
                    onClose={handleCloseLogin}
                    onRegisterClick={(event) => handleRegisterFormClick(event)}
                    onForgotPasswordClick={(event) => handleForgotPasswordFormClick(event)}
                />}
                {showRegister && <RegisterForm onClose={handleCloseRegister} onLoginClick={handleLoginFormClick} />}
                {showForgotPassword && <ForgotPasswordForm onClose={handleCloseForgotPassword} onLoginClick={handleLoginFormClick} />}
            </div>
        </>
    )
}

export default Ticket

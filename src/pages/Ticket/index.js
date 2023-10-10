import { createContext } from 'react';
import { Link } from 'react-router-dom';
import NormalBanner from '~/component/Layout/components/NormalBanner';
import { useAppContext } from '~/context';
import styles from './Ticket.module.scss';
import TicketDetail from './TicketDetail';

// import { Link } from 'react-router-dom';

export const TicketContext = createContext();
function Ticket() {
    const { setTotalQuantity, setTotalPrice, totalPrice, tickets, auth } = useAppContext();
    const handleIncreaseQuantity = (price) => {
        // console.log(price)
        setTotalQuantity(prev => prev + 1)
        setTotalPrice(prev => prev + Number(price))
    }
    const handleReduceQuantity = (price) => {
        // console.log(totalQuantity)
        setTotalQuantity(prev => prev - 1)
        setTotalPrice(prev => prev - Number(price))
    }
    // const contextValue = { totalPrice, totalQuantity };

    // useEffect(() => {
    //     if (totalQuantity == 0) {
    //         setTotalPrice(0)
    //     }
    //     console.log(totalQuantity)
    // }, [totalQuantity])

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
            <div className={styles.table_container}>
                <table className={styles.table}>
                    <tr className={styles.table_row}>
                        <th className={styles.table_header}></th>
                        <th className={styles.table_header}>Ticket</th>
                        <th className={styles.table_header}>Price</th>
                        <th className={styles.table_header}>Quantity</th>
                    </tr>
                    {tickets.map(ticket => {
                        return <TicketDetail ticket={ticket}
                            // key={ticket.id}
                            increaseQuantity={(price) => handleIncreaseQuantity(price)}
                            reduceQuantity={(price) => handleReduceQuantity(price)} />
                    })}

                    <tr className={`${styles.table_row} ${styles.total}`}>
                        <td colSpan='4' className={styles.table_data}>
                            <b>Total Price: {totalPrice} VND</b>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={styles.buy}>
                {/* {auth ? <Link to="/summary" className={styles.btn}>Buy</Link>
                    : <Link to="/" className={styles.btn}>Buy</Link>
                } */}
                <Link to="/summary" className={styles.btn}>CheckOut</Link>
            </div>
        </>
    )
}

export default Ticket



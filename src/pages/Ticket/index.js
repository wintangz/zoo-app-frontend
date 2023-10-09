import { createContext, useEffect, useState } from 'react';
import * as ticketService from '~/api/ticketService';
import NormalBanner from '~/component/Layout/components/NormalBanner';
import styles from './Ticket.module.scss';
import TicketDetail from './TicketDetail';

// import { Link } from 'react-router-dom';

export const TicketContext = createContext();
function Ticket() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
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
    const [tickets, setTickets] = useState([]);

    const fetchData = async () => {
        const result = await ticketService.getTickets();
        setTickets(result);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     if (totalQuantity == 0) {
    //         setTotalPrice(0)
    //     }
    //     console.log(totalQuantity)
    // }, [totalQuantity])

    return (
        // <TicketContext.Provider value={contextValue}>
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
                            <b>Total Price: {totalPrice}</b>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={styles.buy}>
                <a href="/summary" className={styles.btn}>Buy</a>
            </div>
        </>
        // </TicketContext.Provider>
    )
}

export default Ticket



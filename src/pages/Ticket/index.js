import React from 'react'
import styles from './Ticket.module.scss'
import NormalBanner from '~/component/Layout/components/NormalBanner'
import { useState } from "react";
import { Prev } from 'react-bootstrap/esm/PageItem';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tickets } from './Tickets'
import TicketDetail from './TicketDetail';

function Ticket() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const handleIncreaseQuantity = (price) => {
        console.log(price)
        setTotalQuantity(prev => prev + 1)
        setTotalPrice(prev => prev + Number(price))
    }
    return (<>
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
                    return <TicketDetail ticket={ticket} increaseQuantity={(price) => handleIncreaseQuantity(price)} />
                })}
                <tr className={`${styles.table_row} ${styles.total}`}>
                    <td colSpan='4' className={styles.table_data}>
                        <b>Total Price: {totalPrice}</b>
                    </td>
                    {/* <td colSpan='2' className={`${styles.table_data} ${styles.price}`}></td> */}
                </tr>
            </table>
        </div>

        <div className={styles.buy}>
            <div className={styles.btn}>Buy</div>
        </div>
    </>)
}

export default Ticket



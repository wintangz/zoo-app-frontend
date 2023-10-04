import React from 'react'
import styles from './Ticket.module.scss'
import NormalBanner from '~/component/Layout/components/NormalBanner'
import { useState } from "react";
import { Prev } from 'react-bootstrap/esm/PageItem';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { tickets } from './Tickets'

function Ticket() {
    const [setTotalPrice] = useState(0)
    // set adult
    const [value1, setValue1] = useState(0)
    const PlusPrice = () => {
        setValue1(value1 + 1)
    }
    const MinPrice = () => {
        if (value1 > 0) { setValue1(value1 - 1) }
    }

    // set 4 <= children < 15
    const [value2, setValue2] = useState(0)
    const PlusPrice2 = () => {
        setValue2(value2 + 1)
    }
    const MinPrice2 = () => {
        if (value2 > 0) { setValue2(value2 - 1) }
    }

    // set children < 4
    const [value3, setValue3] = useState(0)
    const PlusPrice3 = () => {
        setValue3(value3 + 1)
    }
    const MinPrice3 = () => {
        if (value3 > 0) { setValue3(value3 - 1) }
    }

    // set event
    const [value4, setValue4] = useState(0)
    const PlusPrice4 = () => {
        setValue4(value4 + 1)
    }
    const MinPrice4 = () => {
        if (value3 > 0) { setValue4(value3 - 1) }
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
                    return (
                        <tr className={styles.table_row}>
                            <td className={styles.table_data1}>
                                <img src={ticket.img} />
                            </td>
                            <td className={styles.table_data}>
                                <b>{ticket.name}</b>
                                <br />{ticket.info}
                            </td>
                            <td className={`${styles.table_data} ${styles.price}`}>{ticket.price}</td>
                            <td className={styles.table_data}>
                                <div className={styles.input}>
                                    <div className={styles.btn} onClick={MinPrice}><AiOutlineMinus /></div>
                                    <div className={styles.value}>{value1}</div>

                                    <div className={styles.btn} onClick={PlusPrice}><AiOutlinePlus /></div>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                <tr className={`${styles.table_row} ${styles.total}`}>
                    <td colSpan='4' className={styles.table_data}>
                        <b>Total Price: {value1 * 60000 + value2 * 40000 + value4 * 120000}</b>
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



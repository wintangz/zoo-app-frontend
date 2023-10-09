import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styles from './Ticket.module.scss';

// import { TotalQuantityContext } from './index';

export default function TicketDetail(props) {
    const [value, setValue] = useState(0);
    // const totalQty = useContext(TotalQuantityContext);
    const PlusPrice = () => {
        setValue(value + 1);
        props.increaseQuantity(props.ticket.price);
    };
    const MinPrice = () => {
        if (value > 0) {
            setValue(value - 1);
            props.reduceQuantity(props.ticket.price);
        }
    };


    return (
        <tr className={styles.table_row}>
            <td className={styles.table_data1}>
                <img src={props.ticket.imgUrl} />
            </td>
            <td className={styles.table_data}>
                <b>{props.ticket.name}</b>
                <br />
                {props.ticket.description}
            </td>
            <td className={`${styles.table_data} ${styles.price}`}>{props.ticket.price}</td>
            <td className={styles.table_data}>
                <div className={styles.input}>
                    <div className={styles.btn} onClick={MinPrice}>
                        {value > 0 && <AiOutlineMinus />}
                    </div>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.btn} onClick={PlusPrice}>
                        <AiOutlinePlus />
                    </div>
                </div>
            </td>
        </tr>
    );
    // })
    // );
}

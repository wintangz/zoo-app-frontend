import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppContext } from '~/context';
import styles from './Ticket.module.scss';


export default function TicketDetail(props) {
    const [value, setValue] = useState(0);
    // const totalQty = useContext(TotalQuantityContext);
    const { setCart, cart } = useAppContext()
    const PlusPrice = () => {
        setValue(value + 1);
        props.increaseQuantity(props.ticket.price);
        setCart(cart.map(item => {
            return item.id === props.ticket.id ? {
                ...item, quantity: item.quantity + 1, totalItemPrice: (item.quantity + 1) * item.price
            } : item
        }
        ));
    };
    const MinPrice = () => {
        if (value > 0) {
            setValue(value - 1);
            props.reduceQuantity(props.ticket.price);
            setCart(cart.map(item => {
                return item.id === props.ticket.id ? {
                    ...item, quantity: item.quantity - 1, totalItemPrice: (item.quantity - 1) * item.price
                } : item
            }));
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
            <td className={`${styles.table_data} ${styles.price}`}>{props.ticket.price} VND</td>
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

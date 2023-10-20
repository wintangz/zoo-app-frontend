import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppContext } from '~/context/Context';
import styles from './Ticket.module.scss';

function formatPrice(totalPrice) {

    if (totalPrice === 0)
        return;

    let totalPriceString = totalPrice.toString();

    // Calculate the position to insert the dot
    let dotPosition = totalPriceString.length - 3;

    // Insert the dot at the calculated position
    let formattedPrice = totalPriceString.slice(0, dotPosition) + '.' + totalPriceString.slice(dotPosition);

    // Return the formatted price
    return formattedPrice;
}

export default function TicketDetail(props) {
    const { setCart, cart } = useAppContext()

    const [value, setValue] = useState(0)
    const PlusPrice = () => {
        setValue(value + 1);
        props.increaseQuantity(props.ticket.price);
        setCart(cart.map(item => {
            return item.id === props.ticket.id ? {
                ...item, quantity: item.quantity + 1, totalItemPrice: (item.quantity + 1) * item.price
            } : item
        }
        ));
        localStorage.setItem(`ticket_${props.ticket.id}`, (value + 1).toString());
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
            localStorage.setItem(`ticket_${props.ticket.id}`, (value - 1).toString());
        }
    };
    useEffect(() => {
        const storedValue = localStorage.getItem(`ticket_${props.ticket.id}`);
        if (storedValue) {
            setValue(parseInt(storedValue, 10));
        }
        const clearTicketLocalStorage = () => {
            localStorage.removeItem(`ticket_${props.ticket.id}`);
        };

        window.addEventListener('beforeunload', clearTicketLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', clearTicketLocalStorage);
        };
    }, [props.ticket.id]);


    return (
        <tr className={styles.table_row}>
            <td className={styles.table_data}>
                <b>{props.ticket.name}</b>
                <br />
                {props.ticket.description}
            </td>
            <td className={`${styles.table_data} ${styles.price}`}>{formatPrice(props.ticket.price)} VND</td>
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

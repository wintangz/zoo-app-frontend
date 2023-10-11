// import { useContext } from 'react';
// import { TicketContext } from '../index';
import styles from './Summary.module.scss';

function ConfirmTickets(props) {

    if (props.cart != null)
        return (
            props.cart.map((cart) =>
                cart.quantity !== 0 && (
                    <tr className={styles.table_row}>
                        <td className={styles.img_ticket}><img alt="lorem" src={cart.imgUrl} /></td>
                        <td className={styles.table_data}>{cart.name}</td>
                        <td className={styles.table_data}>{cart.price === 0 ? 'Free' : cart.price} VND</td>
                        <td className={styles.table_data}>{cart.quantity}</td>
                        <td className={styles.table_data}>{cart.totalItemPrice === 0 ? 'Free' : cart.totalItemPrice} VND</td>
                    </tr>
                )
            )
        )
}

export default ConfirmTickets
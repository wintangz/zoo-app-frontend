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
                        <td className={styles.cart_name}>{cart.name}</td>
                        <td className={styles.cart_unitprice}>{cart.price === 0 ? 'Free' : cart.price}</td>
                        <td className={styles.cart_totalquantity}>{cart.quantity}</td>
                        <td className={styles.cart_totalPrice}>{cart.totalItemPrice === 0 ? 'Free' : cart.totalItemPrice}</td>
                    </tr>
                )
            )

        )
}

export default ConfirmTickets
// import { useContext } from 'react';
// import { TicketContext } from '../index';
import styles from './Summary.module.scss';

function ConfirmTickets(props) {
    return (
        props.cart.map((cart) =>
            cart.quantity !== 0 && (
                <tr className={styles.table_row}>
                    <td><img alt="lorem" src={cart.imgUrl} /></td>
                    <td>{cart.name}</td>
                    <td>{cart.price === 0 ? 'Free' : cart.price}</td>
                    <td>{cart.quantity}</td>
                    <td>{cart.totalItemPrice === 0 ? 'Free' : cart.price}</td>
                </tr>
            )
        )

    )
}

export default ConfirmTickets
// import { useContext } from 'react';
// import { TicketContext } from '../index';
import styles from './ConfirmTickets.module.scss';

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function ConfirmTickets(props) {

    console.log(props.cart);
    if (props.cart != null)
        return (
            props.cart.map((cart) =>
                cart.quantity !== 0 && cart.status && (
                    <>
                        {/* <tr className={styles.table_row}>
                            <td className={styles.img_ticket}><img alt="lorem" src={cart.imgUrl} /></td>
                            <td className={styles.table_data}>{cart.name}</td>
                            <td className={styles.table_data}>{cart.price === 0 ? 'Free' : cart.price} VND</td>
                            <td className={styles.table_data}>{cart.quantity}</td>
                            <td className={styles.table_data}>{cart.totalItemPrice === 0 ? 'Free' : cart.totalItemPrice} VND</td>
                        </tr> */}

                        <tr className={styles.table_row}>
                            <td className={styles.table_img}>
                                <div>
                                    <img alt="imgTicket" src={cart.imgUrl} />
                                </div>
                            </td>
                            <td className={styles.table_data}>
                                {cart.name}
                            </td>
                            <td className={styles.table_data}>
                                {cart.price === 0
                                    ? 'Free'
                                    : `${formatPrice(cart.price)} VND`}
                            </td>
                            <td className={styles.table_quantity}>
                                {cart.quantity}
                            </td>
                            <td className={styles.table_total}>
                                {cart.totalItemPrice === 0
                                    ? 'Free'
                                    : `${formatPrice(cart.totalItemPrice)} VND`}
                            </td>
                        </tr>
                    </>
                )
            )
        )
}

export default ConfirmTickets
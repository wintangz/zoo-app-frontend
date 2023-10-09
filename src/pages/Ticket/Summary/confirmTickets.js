import { useContext } from 'react';
// import { TicketContext } from '../index';
import { TicketContext } from '..';
import styles from './Summary.module.scss';

function ConfirmTickets(props) {
    const ticket = useContext(TicketContext);
    // const { totalPrice, totalQuantity } = useContext(TicketContext);
    return (
        <tr className={styles.table_row}>
            <td></td>
            <td>{props.ticket}</td>
            <td>18000</td>
            <td>1</td>
            <td>{props.totalPrice}</td>
        </tr>
    )
}

export default ConfirmTickets
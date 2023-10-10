import NormalBanner from '~/component/Layout/components/NormalBanner';
import { useAppContext } from '~/context';
import styles from './Summary.module.scss';
import ConfirmTickets from './confirmTickets';
import Information from './information';

function Summary() {
    const { cart, totalPrice, totalQuantity } = useAppContext()
    // const handleSubmitBuy = async () => {
    //     try {
    //         // const {data} = await axios.post('/')
    //         alert(totalQuantity);
    //     } catch (error) {

    //     }
    // }
    return (<>
        <div className={styles.imgbanner}>
            <NormalBanner />
        </div>
        <div className={styles.container}>
            <div className={styles.progress}>
                <div className={styles.progress_bar}></div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.first_step}>
                            <div className={styles.progress_number}>1</div>
                            <div className={styles.progress_title}>Summary</div>
                        </div>
                        <div className={styles.first_step}>
                            <div className={styles.progress_number}>2</div>
                            <div className={styles.progress_title}>Payment</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.checkout_form}>
                <div className={styles.container}>
                    <Information />
                </div>
            </div>
            <div className={styles.checkout_summary}>
                <div className={styles.col}>
                    <div className={styles.card}>
                        <div className={styles.card_header}>
                            <h5>Items</h5>
                        </div>
                        <div className={styles.card_body}>
                            <table className={styles.table}>
                                <tr className={styles.table_row}>
                                    <th></th>
                                    <th>Ticket</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                <ConfirmTickets cart={cart} />
                                <tr className={`${styles.table_row} ${styles.total}`}>
                                    <td className={styles.table_data}>
                                        <b>Total: {totalPrice}</b>
                                        <b>Total quantity: {totalQuantity}</b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                {/* <button onClick={handleSubmitBuy} className={styles.btn}>Buy</button> */}
            </div>
        </div>
    </>)
}

export default Summary
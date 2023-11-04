import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { confirmTicketPurchase } from '~/api/confirmService';
import { getInfo } from '~/api/informationService';
import vnpayLogo from '~/assets/img/vnpayLogo.png';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import { useAppContext } from '~/context/Context';
import styles from './Summary.module.scss';
import ConfirmTickets from './confirmTickets';
import Information from './information';

function Summary() {

    const { cart, totalPrice, totalQuantity } = useAppContext();
    const handleSubmitBuy = async () => {
        try {
            const result = await confirmTicketPurchase(cart, totalPrice, totalQuantity);
            // alert('Purchase successful');
            localStorage.removeItem('thankYouPageShown');
            console.log(result.data);
            window.location.href = result.data;
        } catch (error) {
            console.error(error.message);
            // alert('Purchase failed');
        }
    };

    const [info, setInfo] = useState(null);
    const { control, checkPayment } = useForm();

    const token = localStorage.getItem('token');

    const fetchApi = async () => {
        const result = await getInfo(token);
        setInfo(result);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return (<>
        <div className={styles.imgbanner}>
            <NormalBanner />
        </div>
        <div className={styles.container_checkout}>
            <section className={styles.card}>
                <h2 className={styles.title}>Order Summary</h2>
                <div className={styles.card_body}>
                    <table className={styles.table}>
                        <tr className={styles.table_row}>
                            <th className={styles.table_data}>Ticket Image</th>
                            <th className={styles.table_data}>Ticket Type</th>
                            <th className={styles.table_data}>Unit Price</th>
                            <th className={styles.table_data}>Quantity</th>
                            <th className={styles.table_data}>Total Price</th>
                        </tr>
                        <ConfirmTickets cart={cart} />
                    </table>
                </div>
            </section>
            <div className={styles.below}>
                <div className={styles.infomation}>
                    <h2><InfoIcon /> Customer Infomation</h2>
                    <table className={styles.table_info}>
                        {info && <Information info={info} />}
                    </table>
                </div>
                <div className={styles.total_price}>
                    <h2><PaymentIcon /> Payment</h2>
                    <table>
                        <tr>
                            <td>Payment Method:</td>
                            <td><label className={styles.radioContainer}>
                                <Controller
                                    control={control}
                                    name="payment"
                                    render={({ field }) => (
                                        <>
                                            <div className={styles.paymentContainer}>
                                                <input
                                                    type="radio"
                                                    value="VNPAY"
                                                    {...field}
                                                    className={styles.paymentRadio}
                                                    ref={checkPayment}
                                                    checked
                                                />
                                                <div className={styles.paymentText}>
                                                    <img src={vnpayLogo} className={styles.vnpayLogo} alt="VNPAY Logo" />
                                                    VNPAY
                                                </div>
                                            </div>
                                        </>
                                    )}
                                />
                            </label></td>
                        </tr>
                        <tr className={styles.allTotal}>
                            <td>Total:</td>
                            <td><td>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND</td></td>
                        </tr>
                    </table>
                    <div className={styles.submit}>
                        <button onClick={handleSubmitBuy} className={styles.btn}>Buy</button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default Summary;
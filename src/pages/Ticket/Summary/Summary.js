import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { confirmTicketPurchase } from '~/api/confirmService';
import { getInfo } from '~/api/informationService';
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
        {/* <div className={styles.container}> */}

        {/* <div className={styles.progress}>
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
            </div> */}
        {/* <div className={styles.checkout_form}>
                <div className={styles.container}>
                    {info && <Information info={info} />}
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
                                    <th className={styles.table_data}>Ticket Image</th>
                                    <th className={styles.table_data}>Ticket Type</th>
                                    <th className={styles.table_data}>Unit Price</th>
                                    <th className={styles.table_data}>Quantity</th>
                                    <th className={styles.table_data}>Total Price</th>
                                </tr>
                                <ConfirmTickets cart={cart} />
                                <tr className={`${styles.table_row} ${styles.total}`}>
                                    <td className={styles.table_data}>
                                        <b>Total: {totalPrice} VND</b>
                                        <b>Total quantity: {totalQuantity}</b>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Payment Method</h5>
                </div>
                <div className={styles.card_body}>
                    <label className={styles.radioContainer}>
                        <Controller
                            control={control}
                            name="payment"
                            render={({ field }) => (
                                <>
                                    <input
                                        type="radio"
                                        value="VNPAY"
                                        {...field}
                                        className={styles.paymentRadio}
                                        ref={checkPayment}
                                    />
                                    <span className={styles.payment}>VNPAY</span>
                                </>
                            )}
                        />
                    </label>
                </div>
            </div>
            <div>
                <button onClick={handleSubmitBuy} className={styles.btn}>Buy</button>
            </div>
        </div> */}



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
                    <h2><InfoIcon /> Infomation</h2>
                    <table>
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
                                            <input
                                                type="radio"
                                                value="VNPAY"
                                                {...field}
                                                className={styles.paymentRadio}
                                                ref={checkPayment}
                                            />
                                            <span className={styles.payment}> VNPAY</span>
                                        </>
                                    )}
                                />
                            </label></td>
                        </tr>
                        <tr className={styles.allTotal}>
                            <td>Total:</td>
                            <td>{totalPrice.toLocaleString()} VND</td>
                        </tr>
                        <tr className={styles.submit}>
                            <button onClick={handleSubmitBuy} className={styles.btn}>Buy</button>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    </>)
}

export default Summary;
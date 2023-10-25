import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { useEffect } from 'react';
import { ApiRequest } from '~/api/orderService';
import styles from './Thanks.module.scss';

const ThankYouPage = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const responseCode = queryParams.get('vnp_ResponseCode');
    const txnRef = queryParams.get('vnp_TxnRef');
    const orderInfo = queryParams.get('vnp_OrderInfo');
    const bankCode = queryParams.get('vnp_BankCode');
    const amount = queryParams.get('vnp_Amount');

    const handlePaymentConfirmation = async () => {
        try {
            if (responseCode === '00') {
                // Perform actions if ResponseCode is '00'
                console.log('Please check your email');

                const response = await ApiRequest({
                    params: {
                        vnp_TxnRef: txnRef,
                        vnp_ResponseCode: responseCode,
                        vnp_OrderInfo: orderInfo,
                        vnp_BankCode: bankCode,
                        vnp_Amount: amount
                    },
                });

                console.log('GET request response:', response.data);
            } else {
                // ResponseCode is not '00'
                console.log('Waiting');
            }
        } catch (error) {
            console.error('Error processing payment confirmation:', error);
        }
    };

    useEffect(() => {
        handlePaymentConfirmation();
    }, [responseCode, txnRef]);

    return (
        <div className={styles.container_thanks}>

            {responseCode === '00' ? (
                <>
                    <h1 className={styles.thanks}>Thank you.</h1>
                    <h2 className={styles.mail}>Your order was completed successfully.</h2>
                    <div className={styles.check}>
                        <AttachEmailIcon />
                        <p><i>An email receipt including the details about your order has been <br /> sent to the email address provided. Please keep it for your records.</i></p>
                    </div>
                    <div className={styles.button}>
                        <button>Back to Home</button>
                    </div>
                </>
            ) : (
                // <p className={`waiting-text ${styles.waitingText}`}>Waiting...</p>
                <div className={styles.loader}></div>
            )}

        </div>
    );
};

export default ThankYouPage;
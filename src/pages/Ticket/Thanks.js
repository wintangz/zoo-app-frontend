import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRequest } from '~/api/orderService';
import styles from './Thanks.module.scss';

const ThankYouPage = () => {
    const navigate = useNavigate();
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
                if (!localStorage.getItem('thankYouPageShown')) {
                    localStorage.setItem('thankYouPageShown', 'true');
                }
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
        const thankYouPageShown = localStorage.getItem('thankYouPageShown');
        if (!thankYouPageShown) {
            handlePaymentConfirmation();
        }
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
                        <button onClick={() => navigate('/')} className={styles.backToHomeButton}>
                            Back to Home
                        </button>
                    </div>

                </>
            ) : (
                // <p className={`waiting-text ${styles.waitingText}`}>Waiting...</p>
                <>
                    <h1 className={styles.thanks}>Warning</h1>
                    <h2 className={styles.mail}>You haven't paid for your order yet.</h2>
                    <div className={styles.check}>
                        <AttachEmailIcon />
                        <p><i>An email receipt including the details about your order has been <br /> sent to the email address provided. Please keep it for your records.</i></p>
                    </div>
                    <div className={styles.button}>
                        <button onClick={() => navigate('/')} className={styles.backToHomeButton}>
                            Back to Home
                        </button>
                    </div>

                </>
            )}

        </div>
    );
};

export default ThankYouPage;
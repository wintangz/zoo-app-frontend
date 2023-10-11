import axios from 'axios';
import { useEffect } from 'react';
import styles from './Ticket.module.scss';

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

                // Make a GET request to the specified endpoint with request parameters
                const token = localStorage.getItem('token');
                const apiUrl = 'http://localhost:8080/api/orders/payment';

                const response = await axios.get(apiUrl, {
                    params: {
                        vnp_TxnRef: txnRef,
                        vnp_ResponseCode: responseCode,
                        vnp_OrderInfo: orderInfo,
                        vnp_BankCode: bankCode,
                        vnp_Amount: amount
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            <h1>Thank You for Purchasing</h1>
            {responseCode === '00' ? (
                <p>Please check your email.</p>
            ) : (
                <p>Waiting...</p>
            )}
        </div>
    );
};

export default ThankYouPage;
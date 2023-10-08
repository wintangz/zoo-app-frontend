import styles from './Summary.module.scss';

export default function Information() {

    return (
        <div className={styles.row}>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Billing Address</h5>
                </div>
                <div className={styles.card_body}>
                    <b className={styles.name}>vanh</b>
                    <p className={styles.street}>168/5 binh duong 3 an binh</p>
                    <p className={styles.district}>di an</p>
                    <p className={styles.city}>binh duong</p>
                    <p className={styles.country}>viet nam</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Contact Method</h5>
                </div>
                <div className={styles.card_body}>
                    <p>Selected shipping type: Email</p>
                    <p className={styles.email}>to: anhvnvse172006@fpt.edu.vn</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Method Of Payment</h5>
                </div>
                <div className={styles.card_body}>
                    <p>Selected payment type:</p>
                    <b className={styles.payment}>MoMo</b>
                </div>
            </div>
        </div>
    );
}
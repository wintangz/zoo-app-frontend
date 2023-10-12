import styles from './Summary.module.scss';

export default function Information(props) {
    console.log(props);
    return (
        <div className={styles.row}>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Billing Address</h5>
                </div>
                <div className={styles.card_body}>
                    <b className={styles.table_data}>{props.info.lastname} {props.info.firstname}</b>
                    {/* <p className={styles.table_data}>168/5 binh duong 3 an binh</p>
                    <p className={styles.table_data}>di an</p> */}
                    <p className={styles.table_data}>{props.info.address}</p>
                    <p className={styles.table_data}>{props.info.nationality}</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h5>Contact Method</h5>
                </div>
                <div className={styles.card_body}>
                    <p>Selected shipping type: Email</p>
                    <p className={styles.email}>to: {props.info.email}</p>
                </div>
            </div>

        </div>
    );
}
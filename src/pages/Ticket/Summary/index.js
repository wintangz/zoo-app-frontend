import NormalBanner from '~/component/Layout/components/NormalBanner';
import styles from './Summary.module.scss';

function Summary() {
    return (<>
        <div className={styles.imgbanner}>
            <NormalBanner />
        </div>
        <div className={styles.container}>
            <div className={styles.progress}>
                <div className={styles.progress_bar}></div>
            </div>
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
    </>)
}

export default Summary
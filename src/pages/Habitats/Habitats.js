import styles from './Habitats.module.scss';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import HabitatZone from './HabitatZone/HabitatZone';

function Habitats() {
    return (
        <>
            <div className={styles.habitat__container}>
                <div className={styles.bg__container}>
                    <NormalBanner />
                </div>
                <div className={styles.habitat}>
                    <HabitatZone />
                </div>
            </div>
        </>
    );
}

export default Habitats;
import React from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import tiger from '~/assets/animals/tiger-entity.png';
import Sidebar from './Components/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper';

function Animals() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.animal_profile}>
                <div className={styles.entity}>
                    <img src={tiger} />
                </div>
            </div>
            <div className={`${styles.animal_list}`}>
                <AnimalWrapper />
            </div>
        </div>
    );
}

export default Animals;

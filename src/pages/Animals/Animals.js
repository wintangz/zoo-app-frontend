import React from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import tiger from '~/assets/animals/tiger-entity.png';
import Sidebar from './Components/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper';
import AnimalProfile from './Components/AnimalProfile';

function Animals() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <AnimalProfile />
            <div className={`${styles.animal_list}`}>
                <AnimalWrapper />
            </div>
        </div>
    );
}

export default Animals;

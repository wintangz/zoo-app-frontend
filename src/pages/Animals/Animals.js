import React from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import Sidebar from './Components/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper';
import AnimalProfile from './Components/AnimalProfile';
import animals from './AnimalsData';
import { useLocation, useParams } from 'react-router-dom';

function Animals() {
    const { animalId } = useParams();
    console.log({ animalId });
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

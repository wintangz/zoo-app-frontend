import React, { useEffect, useState } from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import AnimalBackground from './Components/AnimalBackground/AnimalBackground'
import Sidebar from './Components/Sidebar/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper/AnimalWrapper';
import AnimalProfile from './Components/AnimalProfile/AnimalProfile';
import * as animalsService from '~/api/animalsService';

function Animals() {

    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const fetchApi1 = async () => {
        const result = await animalsService.getAnimals();
        setAnimals(result);
    }

    const fetchApi2 = async () => {
        const result = await animalsService.getHabitats();
        setHabitats(result);
    }

    useEffect(() => {
        fetchApi1();
        fetchApi2();
    }, []);

    return (
        <div className={styles.container}>
            {habitats && <AnimalBackground habitats={habitats} />}
            {habitats && <Sidebar habitats={habitats} />}
            {animals && <AnimalProfile animals={animals} habitats={habitats} />}
            {animals && <AnimalWrapper animals={animals} habitats={habitats} />}
        </div>
    );
}

export default Animals;

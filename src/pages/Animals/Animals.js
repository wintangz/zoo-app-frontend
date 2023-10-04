import React, { useEffect, useState } from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import Sidebar from './Components/Sidebar/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper/AnimalWrapper';
import AnimalProfile from './Components/AnimalProfile/AnimalProfile';
import * as animalsService from '~/api/animalsService';

function Animals() {

    const [animals, setAnimals] = useState(null);

    const fetchApi = async () => {
        const result = await animalsService.getAnimals();
        setAnimals(result);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar />
            {animals && <AnimalProfile animals={animals} />}
            {animals && <AnimalWrapper animals={animals} />}
        </div>
    );
}

export default Animals;

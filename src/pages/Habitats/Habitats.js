import { useEffect, useState } from 'react';
import styles from './Habitats.module.scss';

import * as animalsService from '~/api/animalsService';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import HabitatZone from './HabitatZone/HabitatZone';

function Habitats() {

    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const fetchApi = async () => {
        const resultAnimal = await animalsService.getAnimals();
        setAnimals(resultAnimal);

        const resultHabitat = await animalsService.getHabitats();
        setHabitats(resultHabitat);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <div className={styles.habitat__container}>
                <div className={styles.bg__container}>
                    <NormalBanner />
                </div>
                <div className={styles.habitat}>
                    <HabitatZone animals={animals} habitats={habitats} />
                </div>
            </div>
        </>
    );
}

export default Habitats;
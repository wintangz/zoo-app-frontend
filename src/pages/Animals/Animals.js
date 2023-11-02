import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Animals.module.scss';
import 'swiper/css';
import AnimalBackground from './Components/AnimalBackground/AnimalBackground'
import Sidebar from './Components/Sidebar/Sidebar';
import AnimalWrapper from './Components/AnimalWrapper/AnimalWrapper';
import AnimalProfile from './Components/AnimalProfile/AnimalProfile';
import Loader from "~/component/Layout/components/Loader/Loader"
import * as animalsService from '~/api/animalsService';

function Animals() {

    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const fetchApi1 = useCallback(async () => {
        const result = await animalsService.getAnimals();
        setAnimals(result);
    }, []);

    const fetchApi2 = useCallback(async () => {
        const result = await animalsService.getHabitats();
        setHabitats(result);
    }, []);

    useEffect(() => {
        console.log("Effect triggered");
        console.log("fetchApi1", fetchApi1);
        console.log("fetchApi2", fetchApi2);
        const fetchData = async () => {
            await fetchApi1();
            await fetchApi2();
        };

        fetchData();
    }, [fetchApi1, fetchApi2]);

    const memorizedAnimals = useMemo(() => animals, [animals]);
    const memorizedHabitats = useMemo(() => habitats, [habitats]);

    if (!habitats && !animals) {
        return (
            <Loader />
        );
    }

    return (
        <div className={styles.container}>
            {habitats && <AnimalBackground habitats={memorizedHabitats} />}
            {habitats && <Sidebar habitats={memorizedHabitats} />}
            {animals && <AnimalProfile animals={memorizedAnimals} habitats={memorizedHabitats} />}
            {animals && <AnimalWrapper animals={memorizedAnimals} habitats={memorizedHabitats} />}
        </div>
    );
}

export default Animals;

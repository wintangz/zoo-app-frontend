import { useCallback, useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import * as animalsService from '~/api/animalsService';
import Loader from "~/component/Layout/components/Loader/Loader";
import styles from './Animals.module.scss';
import AnimalBackground from './Components/AnimalBackground/AnimalBackground';
import AnimalProfile from './Components/AnimalProfile/AnimalProfile';
import AnimalWrapper from './Components/AnimalWrapper/AnimalWrapper';
import Sidebar from './Components/Sidebar/Sidebar';

function Animals() {

    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const fetchApi1 = useCallback(async () => {
        const result = await animalsService.getAnimals();
        const animalsWithTrueStatus = result.filter((animals) => animals.status === true);
        setAnimals(animalsWithTrueStatus);
    }, []);

    const fetchApi2 = useCallback(async () => {
        const result = await animalsService.getHabitats();
        const habitatsWithTrueStatus = result.filter((habitats) => habitats.status === true);
        setHabitats(habitatsWithTrueStatus);
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

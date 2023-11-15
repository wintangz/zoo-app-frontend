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
    const [searchTerm, setSearchTerm] = useState('');

    const fetchApi1 = useCallback(async () => {
        const result = await animalsService.getAnimals();
        const animalsWithTrueStatus = result.filter((animal) => animal.status === true);
        setAnimals(animalsWithTrueStatus);
    }, []);

    const fetchApi2 = useCallback(async () => {
        const result = await animalsService.getHabitats();
        const habitatsWithTrueStatus = result.filter((habitat) => habitat.status === true);
        setHabitats(habitatsWithTrueStatus);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchApi1();
            await fetchApi2();
        };

        fetchData();
    }, [fetchApi1, fetchApi2]);

    const memorizedAnimals = useMemo(() => animals, [animals]);
    const memorizedHabitats = useMemo(() => habitats, [habitats]);

    const filteredAnimals = memorizedAnimals ? memorizedAnimals.filter(animal => animal.name.toLowerCase().includes(searchTerm.toLowerCase())) : null;

    if (!habitats && !animals) {
        return <Loader />;
    }

    return (
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
            {habitats && <AnimalBackground habitats={memorizedHabitats} />}
            {habitats && <Sidebar habitats={memorizedHabitats} />}
            {/* {filteredAnimals && (
                <div className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <input
                        type="text"
                        placeholder="Search Animal Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded"
                        style={{ zIndex: 1000 }}
                    />
                </div>
            )} */}
            {filteredAnimals && <AnimalProfile animals={filteredAnimals} habitats={memorizedHabitats} />}
            {filteredAnimals && <AnimalWrapper animals={filteredAnimals} habitats={memorizedHabitats} />}
        </div>
    );
}

export default Animals;

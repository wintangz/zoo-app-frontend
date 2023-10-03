import React from 'react';
import styles from './Habitats.module.scss';
import { useState } from 'react';

import bgHabitat from '~/assets/background/bgHabitat.jpg';
import Gallery from '~/pages/Habitats/Gallery/Gallery';
import dataGallery from './Gallery/dataGallery';
import HabitatZone from './HabitatZone/HabitatZone';
import { dataHabitatZone } from './HabitatZone/dataHabitatZone';

function Habitats() {

    const [item, setItem] = useState(dataGallery);
    const habitatZone = [...new Set(dataHabitatZone.map((val) => val.type))];

    const filterHabitat = (temp) => {
        const newHabitat = dataGallery.filter((newval) => newval.type === temp);
        setItem(newHabitat);
    }

    return (
        <>
            <div className={styles.habitat__container}>
                <div className={styles.bg__container}>
                    <div className={styles.bg__img}>
                        <img src={bgHabitat}></img>
                    </div>
                </div>
                <div className={styles.habitat}>
                    <HabitatZone
                        habitatZone={habitatZone}
                        filterHabitat={filterHabitat}
                        setItem={setItem}
                    />
                </div>
                <div className={styles.main__content}>
                    <Gallery item={item} />
                </div>
            </div>
        </>
    );
}

export default Habitats;

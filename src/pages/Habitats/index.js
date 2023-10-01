import React from 'react';
import styles from './Habitats.module.scss';
import { useState } from 'react';

import bgHabitat from '../../assets/background/bgHabitat.jpg';
import Gallery from '~/component/Layout/components/Gallery/Gallery';

function Habitats() {
    return (
        <>
            <div className={styles.habitat__container}>
                <div className={styles.bg__container}>
                    <div className={styles.bg__img}>
                        <img src={bgHabitat}></img>
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.headingtile}>
                            <div>Habitats</div>
                        </h1>
                    </div>
                </div>
                <div className={styles.habitat}>
                    <div className={styles.habitat__list}>
                        <div className={styles.habitat__item}>
                            <h1>
                                <i>Habitat loading...</i>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className={styles.animal__img_container}>
                    <div className={styles.animal__img_list}>{/* <MainContent /> */}</div>
                </div>
                <Gallery />
            </div>
        </>
    );
}

export default Habitats;

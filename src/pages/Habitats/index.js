import React from 'react';
import styles from './Habitats.module.scss';
import { useState } from 'react';

import bgHabitat from '~/assets/background/bgHabitat.jpg';
import Gallery from '~/component/Layout/components/Gallery/Gallery';
import habitat_card from './dataHabitat';

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
                    {habitat_card.map((component) => {
                        return (
                            <div className={styles.habitat__list}>
                                <div
                                    className={styles.habitat__item}
                                    style={{
                                        background: 'url(' + component.linkHabitat + ')',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                                <div className={styles.habitat__title}>{component.name}</div>
                                <div className={styles.habitat__title_hover}></div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.main__content}>
                    <Gallery />
                </div>
            </div>
        </>
    );
}

export default Habitats;

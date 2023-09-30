import React from 'react';
import styles from './Habitats.module.scss';
import { useState } from 'react';

import bg from '~/assets/img/news-background.png';

function Habitats() {
    return (
        <>
            <div className={styles.habitat__container}>
                <div className={styles.bg__container}>
                    <div className={styles.bg__img}>
                        <img src={bg}></img>
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.headingtile}>
                            <div>Habitats</div>
                        </h1>
                    </div>
                </div>
                <div className={styles.main__content}>
                    <div className={styles.dropdown__container}>
                        <div className={styles.dropdown__bar}>
                            <h1>Bar here</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Habitats;

import React from 'react';
import styles from './Animals.module.scss';
import { useState } from 'react';

import tiger from '~/assets/animals/tiger-entity.png';

function Animals() {
    return (
        <div className={styles.container}>
            <div className={styles.entity}>
                <img src={tiger} />
            </div>
        </div>
    );
}

export default Animals;

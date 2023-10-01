import React from 'react';
import styles from './animalBackground.module.scss';
import img from '~/assets/img/rainforest.jpg';

function AnimalBackground() {
    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: 'url(' + img + ')',
                backgroundSize: 'cover',
                filter: 'blur(2px)',
                maxWidth: '100%',
            }}
        ></div>
    );
}

export default AnimalBackground;

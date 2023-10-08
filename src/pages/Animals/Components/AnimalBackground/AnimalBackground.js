import React from 'react';
import styles from './AnimalBackground.module.scss';
import { useParams } from 'react-router-dom';

function AnimalBackground(props) {
    const { habitat } = useParams();

    function getCurrent() {
        const habitats = props.habitats || [];

        for (let i = 0; i < habitats.length; i++) {
            if (habitat === habitats[i].name) {
                return (
                    <div
                        className={styles.container}
                        style={{
                            backgroundImage: 'url(' + habitats[i].imgUrl + ')',
                            backgroundSize: 'cover',
                            filter: 'blur(2px)',
                            maxWidth: '100%',
                        }}
                    ></div>
                )
            }
        }
    }


    return (
        getCurrent()
    );
}

export default AnimalBackground;

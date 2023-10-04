import React from 'react'
import styles from './AnimalProfile.module.scss'

import tiger from '~/assets/animals/tiger.jpg'
import { useParams } from 'react-router-dom';

function AnimalProfile(props) {
    const { animalId } = useParams();
    console.log({ animalId });
    return (
        props.animals.map(animal => {
            console.log(animal.id);
            if (parseInt({ animalId }.animalId) === animal.id) {
                return (
                    <div className={styles.animal_profile}>
                        <div className={styles.animal_info}>
                            <div className={styles.title}>
                                {animal.name}
                            </div>
                            <div className={styles.content}>
                                {animal.description}
                            </div>
                        </div>
                        <div className={styles.animal_picture}>
                            <img src={animal.imgUrl} />
                        </div>
                    </div>
                )
            }
        })
    )
}

export default AnimalProfile
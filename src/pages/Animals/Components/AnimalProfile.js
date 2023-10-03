import React from 'react'
import styles from './AnimalProfile.module.scss'
import animals from '../AnimalsData'

import tiger from '~/assets/animals/tiger.jpg'
import { useParams } from 'react-router-dom';

function AnimalProfile() {
    const { animalId } = useParams();
    console.log({ animalId }.animalId);
    return (
        animals.map(animal => {
            if ({ animalId }.animalId === animal.id) {
                return (
                    <div className={styles.animal_profile}>
                        <div className={styles.animal_info}>
                            <div className={styles.title}>
                                {animal.name}
                            </div>
                            <div className={styles.content}>
                                {animal.content}
                            </div>
                        </div>
                        <div className={styles.animal_picture}>
                            <img src={animal.picture} />
                        </div>
                    </div>
                )
            }
        })
    )
}

export default AnimalProfile
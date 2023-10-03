import React from 'react'
import styles from './AnimalProfile.module.scss'
import animals from '../AnimalsData'

import tiger from '~/assets/animals/tiger.jpg'
import { useParams } from 'react-router-dom';

function AnimalProfile() {
    const { animalId } = useParams();
    console.log({ animalId }.animalId);
    return (
        <div className={styles.animal_profile}>
            <div className={styles.animal_info}>
                {animals.map(animal => {
                    if ({ animalId }.animalId === animal.id) {
                        <div className={styles.title}>
                            {animal.name}
                        </div>
                    }
                })}
                <div className={styles.content}>The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside. </div>
            </div>

            <div className={styles.animal_picture}>
                <img src={tiger} />
            </div>
        </div >
    )
}

export default AnimalProfile
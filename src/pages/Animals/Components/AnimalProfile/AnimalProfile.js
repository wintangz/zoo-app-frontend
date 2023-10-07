import React from 'react'
import styles from './AnimalProfile.module.scss'
import { useParams } from 'react-router-dom';

function AnimalProfile(props) {
    const { animalId } = useParams();

    return (
        props.animals.map((animal, index) => {
            if (parseInt({ animalId }.animalId) === animal.id) {
                return (
                    <div key={index} className={styles.animal_profile}>
                        <div className={styles.animal_info}>
                            <div className={styles.title}>
                                {animal.name}
                            </div>
                            <div className={styles.content}>
                                {animal.description}
                            </div>
                        </div>
                        <div className={styles.animal_picture}>
                            <img src={animal.imgUrl} alt='' />
                        </div>
                    </div>
                )
            }
            return null;
        })
    )
}

export default AnimalProfile
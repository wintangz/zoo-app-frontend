import React from 'react'
import styles from './AnimalProfile.module.scss'
import { useParams } from 'react-router-dom';

function AnimalProfile(props) {
    const { animalId } = useParams();
    const { habitat } = useParams();

    if (parseInt(animalId) === 0) {
        return (
            <div className={styles.animal_profile}>
                <div className={styles.animal_info}>
                    <div className={styles.title}>
                        {habitat}
                    </div>
                    <div className={styles.content}>
                        Swipe the list to see more Animals/Habitats
                    </div>
                </div>
            </div>
        );
    }

    return (
        props.animals.map((animal, index) => {
            if (parseInt({ animalId }.animalId) === animal.id) {
                if (animal.habitat.name !== habitat) {
                    console.log(animal.habitat.name)
                    return (
                        <div key={index} className={styles.animal_profile}>
                            <div className={styles.animal_info}>
                                <div className={styles.title}>
                                    What are you looking for?
                                </div>
                            </div>
                        </div>
                    );
                }
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
        })
    )
}

export default AnimalProfile
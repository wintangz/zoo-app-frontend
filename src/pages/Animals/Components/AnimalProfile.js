import React from 'react'
import styles from './AnimalProfile.module.scss'

function AnimalProfile() {
    return (
        <div className={styles.animal_profile}>
            <div>
                <div>Animal Name</div>
                <div>This is an animal</div>
            </div>

            <div>
                <img />
            </div>
        </div>
    )
}

export default AnimalProfile
import React from "react";
import styles from './HabitatZone.module.scss'
import dataGallery from '../Gallery/dataGallery'

function HabitatZone({ habitatZone, filterHabitat, setItem }) {
    return (
        <>
            <div className={styles.btnList}>
                {
                    habitatZone.map(val => (
                        <button
                            className={styles.btnItem}
                            onClick={() => filterHabitat(val)}
                        >
                            {val}
                        </button>
                    ))
                }
                <button
                    className={styles.btnItemAll}
                    onClick={() => setItem(dataGallery)}
                >
                    Show All Habitat
                </button>
            </div>
        </>
    )
}

export default HabitatZone;
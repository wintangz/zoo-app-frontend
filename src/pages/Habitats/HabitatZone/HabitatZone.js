import React, { useEffect, useState } from "react";
import styles from "./HabitatZone.module.scss";
import Gallery from "../Gallery/Gallery";
import classNames from "classnames/bind";
import hoverImg from "~/assets/hover/PNG_image.png"
import { Link, useParams } from "react-router-dom";

import { getHabitats, getHabitatById } from '~/api/animalsService';
import { getSpecies } from '~/api/speciesService';

const cx = classNames.bind(styles);

function HabitatZone() {

    const { id } = useParams();
    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const [habitatsId, setHabitatsId] = useState(null);

    const fetchApi = async () => {
        const resultAnimal = await getSpecies();
        setAnimals(resultAnimal);

        const resultHabitat = await getHabitats();
        setHabitats(resultHabitat);

        const resultHabitatById = await getHabitatById(id);

        setHabitatsId(resultHabitatById);


    }

    useEffect(() => {
        fetchApi();
    }, [id]);

    const [item, setItem] = useState(animals || []);
    const habitatZone = [...new Set((habitats || []).map((val) => val.name))];
    const filterHabitat = (temp) => {
        const newHabitat = animals.filter((newval) => newval.habitat.name === temp);
        setItem(newHabitat);
    }

    const [selectedZone, setSelectedZone] = useState(null);
    const handleZoneClick = (zone) => {
        filterHabitat(zone);
        setSelectedZone(selectedZone === zone ? null : zone); // Toggle the selected zone
    };

    return (
        <div className={styles.btnList}>
            {habitatZone.map((zone) => (
                <div key={zone} className={cx("zone")} >
                    {habitats
                        .filter((component) => component.name === zone)
                        .map((component) => (
                            <Link to={`/habitats/${component.name}`}>
                                <div id={component.name} key={component.name} className={cx("zone--container")} onClick={() => handleZoneClick(zone)}>
                                    <div className={cx('overlay')}></div>
                                    <div
                                        className={cx("zone--background")}
                                        style={{
                                            background: "url(" + component.imgUrl + ")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center bottom -200px",
                                        }}
                                    ></div>
                                    <div className={cx("zone--title")}>{component.name}</div>
                                    <div className={cx("zone--title-hover")}></div>
                                    <div
                                        className={cx("zone--hover")}
                                        style={{
                                            backgroundImage: `url(${hoverImg})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "30%",
                                            right: "-30%",
                                            width: "50%",
                                            height: "100%",
                                            position: "absolute",
                                            opacity: 0,
                                        }}
                                    ></div>
                                </div>
                            </Link>
                        ))}
                    {/* Add Gallery component for each zone */}
                    {selectedZone === zone && (
                        <div key={`gallery-${zone}`} className={styles.galleryWrapper}>
                            <Gallery item={animals.filter((item) => item.habitat.name === zone)} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
export default HabitatZone;
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "~/component/Layout/components/Loader/Loader";
import Gallery from "../Gallery/Gallery";
import styles from "./HabitatZone.module.scss";

import { getHabitatById, getHabitats } from '~/api/animalsService';
import { getSpecies } from '~/api/speciesService';

const cx = classNames.bind(styles);

function HabitatZone() {

    const { id } = useParams();
    const [animals, setAnimals] = useState(null);

    const [habitats, setHabitats] = useState(null);

    const [habitatsId, setHabitatsId] = useState(null);

    const fetchApi = async () => {
        const resultAnimal = await getSpecies();
        const animalsWithTrueStatus = resultAnimal.filter((animals) => animals.status === true);
        setAnimals(animalsWithTrueStatus);

        const resultHabitat = await getHabitats();
        const habitatsWithTrueStatus = resultHabitat.filter((habitats) => habitats.status === true);
        setHabitats(habitatsWithTrueStatus);

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

    if (!habitats) {
        return (
            <Loader />
        );
    }

    return (

        <div className={styles.btnList}>
            {habitatZone.map((zone) => (
                <div key={zone} className={cx("zone")} >
                    {habitats
                        .filter((component) => component.name === zone)
                        .map((component) => (
                            <Link to={`/habitats/${component.name}`} onClick={(e) => e.preventDefault()}>
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
                                            backgroundImage: "url(" + component.bannerUrl + ")",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    ></div>
                                </div>
                            </Link>
                        ))}
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
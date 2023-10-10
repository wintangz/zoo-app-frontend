import React, { useState, useEffect } from "react";
import styles from "./HabitatZone.module.scss";
import Gallery from "../Gallery/Gallery";
import InfiniteScroll from "react-infinite-scroll-hook";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function HabitatZone({ animals, habitats }) {
    const [items, setItems] = useState(animals || []);
    const habitatZone = [...new Set((habitats || []).map((val) => val.name))];
    const [selectedZone, setSelectedZone] = useState(null);

    const filterHabitat = (temp) => {
        const newHabitat = animals.filter((newval) => newval.habitat === temp);
        setItems(newHabitat);
    };

    const handleZoneClick = (zone) => {
        filterHabitat(zone);
        setSelectedZone(selectedZone === zone ? null : zone);
    };

    const loadMoreItems = () => {
        // Add logic to load more items (e.g., fetch from API)
        // For this example, I'm just adding 5 more items each time
        const moreItems = (animals || []).slice(items.length, items.length + 5);
        setItems([...items, ...moreItems]);
    };

    const [infiniteRef] = InfiniteScroll({
        loading: false, // You can set this to true if you want to load items initially
        hasNextPage: true, // Set to false when you've loaded all items
        onLoadMore: loadMoreItems,
        rootMargin: "0px 0px 100px 0px", // Adjust as needed
    });

    return (
        <div className={styles.btnList}>
            {habitatZone.map((zone) => (
                <div key={zone} className={cx("zone")} onClick={() => handleZoneClick(zone)}>
                    {habitats
                        .filter((component) => component.name === zone)
                        .map((component) => (
                            <div key={component.name} className={cx("zone--container")}>
                                <div className={cx("overlay")}></div>
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
                            </div>
                        ))}
                    {/* Add Gallery component for each zone */}
                    {selectedZone === zone && (
                        <div key={`gallery-${zone}`} className={styles.galleryWrapper}>
                            <div ref={infiniteRef}>
                                <Gallery item={items.filter((item) => item.habitat === zone)} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default HabitatZone;
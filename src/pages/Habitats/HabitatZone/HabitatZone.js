import React from "react";
import styles from './HabitatZone.module.scss'
import dataGallery from '../Gallery/dataGallery'

import classNames from 'classnames/bind';
import { dataHabitatZone } from './dataHabitatZone';
const cx = classNames.bind(styles);

function HabitatZone({ habitatZone, filterHabitat, setItem }) {
    return (
        <div className={styles.btnList}>
            {
                habitatZone.map(val => (
                    <div className={cx('zone')}>
                        {dataHabitatZone.map((component) => (
                            <div className={cx('zone--container')} onClick={() => filterHabitat(val)}>
                                <div className={cx('overlay')}></div>
                                <div
                                    className={cx('zone--background')}
                                    style={{
                                        background: 'url(' + component.imgUrl + ')',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                                <div className={cx('zone--title')}>{component.name}</div>
                                <div className={cx('zone--title-hover')}></div>
                                <div
                                    className={cx('zone--hover')}
                                    style={{
                                        background: 'url(' + component.hoverImage + ') no-repeat',
                                        backgroundSize: 'cover',
                                        right: '7%',
                                        width: '50%',
                                        height: '100%',
                                        position: 'absolute',
                                        opacity: 0,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                ))
            }
            {/* <button
                className={styles.btnItemAll}
                onClick={() => setItem(dataGallery)}
            >
                Show All Habitat
            </button> */}
        </div>
    );
}

export default HabitatZone;


{/*         <div className={cx('zone')}>
                {dataHabitatZone.map((component) => (
                    <div className={cx('zone--container')} onClick={() => filterHabitat(component)}>
                        <div className={cx('overlay')}></div>
                        <div
                            className={cx('zone--background')}
                            style={{
                                background: 'url(' + component.imgUrl + ')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        ></div>
                        <div className={cx('zone--title')}>{component.name}</div>
                        <div className={cx('zone--title-hover')}></div>
                        <div
                            className={cx('zone--hover')}
                            style={{
                                background: 'url(' + component.hoverImage + ') no-repeat',
                                backgroundSize: 'cover',
                                right: '7%',
                                width: '50%',
                                height: '100%',
                                position: 'absolute',
                                opacity: 0,
                            }}
                        ></div>
                    </div>
                ))}
            </div> */}
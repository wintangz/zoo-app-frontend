import React, { useState } from 'react';
import styles from './Gallery.module.scss';

function Gallery({ item }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    {item.map((val) => (
                        <div key={val.id} className={styles.galleryItem}>
                            <div className={styles.image} /*key={index} onClick={() => getImg(item.linkImg)}*/>
                                <img src={val.imgUrl} style={{ width: '100%' }} loading='lazy' />
                                <div className={styles.name}>
                                    {val.name}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Gallery;
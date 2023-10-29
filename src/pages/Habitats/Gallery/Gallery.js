import React, { useState } from 'react';
import styles from './Gallery.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, ImageList, ImageListItem } from '@mui/material'

function Gallery({ item }) {
    const [modal, setModal] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [tempimgUrl, setTempimgUrl] = useState('');

    const openModal = (imgUrl, index) => {
        setTempimgUrl(imgUrl);
        setCurrentImgIndex(index);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const navigate = (direction) => {
        const newIndex =
            direction === 'next'
                ? (currentImgIndex + 1) % item.length
                : (currentImgIndex - 1 + item.length) % item.length;

        setTempimgUrl(item[newIndex].imgUrl);
        setCurrentImgIndex(newIndex);
    };

    return (
        <>
            <div className={`${styles.modal} ${modal ? styles.open : ''}`}>
                <ArrowBackIcon className={styles.arrowBack} onClick={() => navigate('prev')} />
                <img src={tempimgUrl} />
                <ArrowForwardIcon className={styles.arrowForward} onClick={() => navigate('next')} />
                <CloseIcon className={styles.closeIcon} onClick={closeModal} />
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    {item.map((val, index) => (
                        <div
                            className={styles.galleryItem}
                            key={index}
                            onClick={() => openModal(val.imgUrl, index)}>
                            <div className={styles.image}>
                                <img src={val.imgUrl} style={{ width: '100%' }} loading='lazy' />
                                <div className={styles.name}>{val.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Gallery;
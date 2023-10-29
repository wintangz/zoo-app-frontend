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
            <Box sx={{
                width: '100vw',  // 100% of the viewport width
                height: '100vh', // 100% of the viewport height
                overflowY: 'scroll',
            }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{ borderRadius: '20px' }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    );
}

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
        title: "Bed"
    },
    {
        img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
        title: "Books"
    },
    {
        img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        title: "Sink"
    },
    {
        img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
        title: "Kitchen"
    },
    {
        img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
        title: "Blinds"
    },
    {
        img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
        title: "Chairs"
    },
    {
        img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
        title: "Laptop"
    },
    {
        img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
        title: "Doors"
    },
    {
        img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
        title: "Coffee"
    },
    {
        img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
        title: "Storage"
    },
    {
        img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
        title: "Candle"
    },
    {
        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        title: "Coffee table"
    }
];
export default Gallery;
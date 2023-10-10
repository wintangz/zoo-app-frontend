import React, { useState } from 'react';
import styles from './Gallery.module.scss';
import CloseIcon from '@mui/icons-material/Close';

function Gallery({ item }) {


    const [modal, setModal] = useState(false);
    const [tempimgUrl, setTempimgUrl] = useState('');
    const getImg = (imgUrl) => {
        setTempimgUrl(imgUrl);
        setModal(true);
        console.warn(imgUrl);
    }

    return (
        <>
            <div
                className={`${styles.modal} ${modal ? styles.open : ''}`}>
                <img src={tempimgUrl} />
                <CloseIcon onClick={() => setModal(false)} />
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    {item.map((val, index) => {
                        return (
                            <div className={styles.galleryItem} key={index} onClick={() => getImg(val.imgUrl)}>
                                <div className={styles.image} >
                                    <img src={val.imgUrl} style={{ width: '100%' }} loading='lazy' />
                                    <div className={styles.name}>
                                        {val.name}
                                    </div>
                                </div>

                            </div>
                        )

                    })}
                </div>
            </div>
        </>
    );
};
export default Gallery;
import React, { useState } from 'react';
import styles from './Gallery.module.scss';
import product_card from '~/pages/Habitats/data';
// import { AiOutlineClose } from 'react-icons/ai';

const Gallery = () => {
    const [model, setModel] = useState(false);
    const [templinkImg, setTempLinkImg] = useState('');

    const getImg = (linkImg) => {
        setTempLinkImg(linkImg);
        setModel(true);
    };

    const icon = {
        fontSize: '50px',
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '2rem',
        height: '2rem',
        padding: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <>
            {/* <div className={model ? 'model open' : 'model'}>
                <img src={templinkImg} />
                <AiOutlineClose style={icon} onClick={() => setModel(false)} />
            </div> */}
            <div className={styles.gallery}>
                {product_card.map((item, index) => {
                    return (
                        <div className={styles.image} key={index} onClick={() => getImg(item.linkImg)}>
                            <img src={item.linkImg} style={{ width: '100%' }}></img>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default Gallery;

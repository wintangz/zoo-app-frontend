import React from 'react';
import styles from './Animals.module.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import tiger from '~/assets/animals/tiger-entity.png';
import { Link } from 'react-router-dom';

function Animals() {
    return (
        <div className={styles.container}>
            <ul className={styles.sidebar}>
                <li className={styles.sideitem}>
                    <Link className={styles.habitats}>Rainforest</Link>
                </li>
                <li className={styles.sideitem}>
                    <Link className={styles.habitats}>Rainforest</Link>
                </li>
                <li className={styles.sideitem}>
                    <Link className={styles.habitats}>Rainforest</Link>
                </li>
                <li className={styles.sideitem}>
                    <Link className={styles.habitats}>Rainforest</Link>
                </li>
                <li className={styles.sideitem}>
                    <Link className={styles.habitats}>Rainforest</Link>
                </li>
            </ul>
            <div className={styles.animal_profile}>
                <div className={styles.entity}>
                    <img src={tiger} />
                </div>
            </div>
            <div className={`${styles.animal_list}`}>
                <Swiper className={`${styles.animal_wrapper}`} spaceBetween={50}
                    slidesPerView={5}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}>
                    <SwiperSlide className={`${styles.animal}`}>A1</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A2</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A3</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A4</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A5</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A5</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A5</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A5</SwiperSlide>
                    <SwiperSlide className={`${styles.animal}`}>A5</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Animals;

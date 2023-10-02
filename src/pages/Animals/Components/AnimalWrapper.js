import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, EffectCoverflow } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './AnimalWrapper.module.scss'
import './AnimalWrapper.css'
import animals from '../AnimalsData';
import arrow_right from '~/assets/img/arrow-right.png';
import arrow_left from '~/assets/img/arrow-left.png';

function AnimalWrapper() {
    const [id, setId] = useState(1);
    return (
        <Swiper className={`${styles.animal_wrapper}`}
            modules={[Navigation, Pagination, Mousewheel, EffectCoverflow]}
            spaceBetween={0}
            slidesPerView={4}
            navigation
            direction='horizontal'
            loop='true'>
            {animals.map((animal) => (
                <SwiperSlide key={animal.id} className={`${styles.card}`}>
                    <Link to={`/animals/${animal.id}`} onClick={() => setId(animal.id)} className={`${styles.animal}`}>
                        <img src={animal.img} />
                    </Link>
                </SwiperSlide>
            ))}
            <div className={styles.arrow_right}>
                <img src={arrow_right} />
            </div>
            <div className={styles.arrow_left}>
                <img src={arrow_left} />
            </div>
        </Swiper>
    )
}

export default AnimalWrapper
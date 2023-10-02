import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './AnimalWrapper.module.scss'
import animals from '../AnimalsData';

function AnimalWrapper() {
    const [id, setId] = useState(1);
    return (
        <Swiper className={`${styles.animal_wrapper}`}
            modules={[Navigation, Pagination, Mousewheel]}
            spaceBetween={5}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            direction='horizontal'
            loop='true'
            mousewheel='true'>
            {animals.map((animal) => (
                <SwiperSlide key={animal.id} className={`${styles.card}`}>
                    <Link className={`${styles.animal}`}><img src={animal.img} /></Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default AnimalWrapper
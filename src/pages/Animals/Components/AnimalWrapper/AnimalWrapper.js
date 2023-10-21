import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, EffectCoverflow } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './AnimalWrapper.module.scss'
import './AnimalWrapper.css'
import arrow_right from '~/assets/img/arrow-right.png';
import arrow_left from '~/assets/img/arrow-left.png';

function AnimalWrapper(props) {
    const { habitat } = useParams();

    return (
        <Swiper className={`${styles.animal_wrapper}`}
            modules={[Navigation, Pagination, Mousewheel, EffectCoverflow]}
            spaceBetween={0}
            slidesPerView={7}
            navigation
            direction='horizontal'>
            {props.animals.map((animal) => {
                if (animal.habitat.name === habitat) {
                    return (
                        <SwiperSlide key={animal.id} className={`${styles.card}`}>
                            <Link to={`/animals/${animal.habitat.name}/${animal.id}`} className={`${styles.animal}`}
                                replace='true'>
                                <img src={animal.avatarUrl} alt='' />
                            </Link>
                        </SwiperSlide>
                    );
                }
            })}
            <div className={styles.arrow_right}>
                <img src={arrow_right} alt='' />
            </div>
            <div className={styles.arrow_left}>
                <img src={arrow_left} alt='' />
            </div>
        </Swiper>
    )
}

export default AnimalWrapper
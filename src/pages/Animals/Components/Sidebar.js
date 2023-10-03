import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import styles from './Sidebar.module.scss'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Sidebar() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Mousewheel]}
            spaceBetween={30}
            slidesPerView={4}
            direction='vertical'
            className={styles.sidebar}>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Rainforest</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Desert</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Grassland</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Savannah</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Mountain</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Mountain</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Mountain</Link>
            </SwiperSlide>
            <SwiperSlide className={styles.sideitem}>
                <Link className={styles.habitats}>Mountain</Link>
            </SwiperSlide>
        </Swiper>
    )
}

export default Sidebar
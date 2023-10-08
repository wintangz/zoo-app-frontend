import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import styles from './Sidebar.module.scss'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Sidebar(props) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Mousewheel]}
            spaceBetween={30}
            slidesPerView={4}
            direction='vertical'
            className={styles.sidebar}
            mousewheel={true}>
            {props.habitats.map((habitat) => {
                return (
                    <SwiperSlide className={styles.sideitem}>
                        <Link to={`/animals/${habitat.name}/0`}
                            className={styles.habitats}
                            replace='true'>{habitat.name}</Link>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    )
}

export default Sidebar
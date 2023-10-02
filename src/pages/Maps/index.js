import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import styles from './maps.module.scss'
import './styles.css';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import map1 from '../../assets/img/map1.png'
import map2 from '../../assets/img/map2.jpg'
import map3 from '../../assets/img/map3.jpg'
import map4 from '../../assets/img/map4.jpg'
import map5 from '../../assets/img/map5.jpg'
import map6 from '../../assets/img/map6.jpg'
const mapsList = [
    {
        id: 1,
        name: 'Teyvat',
        img: map1,
    },
    {
        id: 2,
        name: 'Mondstadt',
        img: map2,
    },
    {
        id: 3,
        name: 'Liyue',
        img: map3,
    },
    {
        id: 4,
        name: 'Inazuma',
        img: map4,
    },
    {
        id: 5,
        name: 'Sumeru',
        img: map5,
    },
    {
        id: 6,
        name: 'Fontaine',
        img: map6,
    },
]
function Maps() {
    return (
        <>
            <Swiper
                // modules={[Navigation, Pagination, Mousewheel]}
                // spaceBetween={20}
                // slidesPerView={1}
                // navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // direction='vertical'
                // loop='true'
                // mousewheel="true"
                direction='vertical'
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={true}
                pagination={{
                    // el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return '<div class="swiper-pagination-container"><span class="' + className + '">' + '</span><div class="swiper-name">' +
                            mapsList[index].name
                            + '</div></div></div>';
                    }
                }}
                modules={[Mousewheel, Pagination]}
                className={styles.sidebar}>
                {mapsList.map((map, index) => {
                    return <>
                        <SwiperSlide key={map.id} className={styles.sideitem}
                            style={{ background: 'url(' + map.img + ') no-repeat center/cover', }}
                        >
                            <Link className={styles.habitats}>{map.name}</Link>
                        </SwiperSlide>
                    </>
                })}


            </Swiper>
        </>
    );
}

export default Maps;

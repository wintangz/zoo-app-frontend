import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Map.module.scss';
import './styles.css';

import map1 from '../../assets/img/map1.png';
import map2 from '../../assets/img/map2.jpg';
import map3 from '../../assets/img/map3.jpg';
import map4 from '../../assets/img/map4.jpg';
import map5 from '../../assets/img/map5.jpg';
import map6 from '../../assets/img/map6.jpg';

import icon1 from '~/assets/img/zone-icon1.png';
import icon2 from '~/assets/img/zone-icon2.png';
import icon3 from '~/assets/img/zone-icon3.png';
import icon4 from '~/assets/img/zone-icon4.png';
import icon5 from '~/assets/img/zone-icon5.png';
const mapsList = [
    {
        id: 1,
        name: 'Teyvat',
        img: map1,
        icon: icon1,
        desc1: 'An Isolated Archipelago Far East of Teyvat.',
        desc: 'Overcome endless thunderstorms and set foot on the islands of red maple and cherry blossoms. On winding shores and towering cliffs, and in forests and mountains full of secrets, witness the Eternity pursued by Her Excellency, the Almighty Narukami Ogosho.'
    },
    {
        id: 2,
        name: 'Mondstadt',
        img: map2,
        icon: icon1,
        desc1: 'A city of freedom that lies in the northeast of Teyvat.',
        desc: 'From amongst mountains and wide-open plains, carefree breezes carry the scent of dandelions — a gift from the Anemo God, Barbatos — across Cider Lake to Mondstadt, which sits on an island in the middle of the lak'
    },
    {
        id: 3,
        name: 'Liyue',
        img: map3,
        icon: icon2,
        desc1: 'A bountiful harbor that lies in the east of Teyvat.',
        desc: "Mountains stand tall and proud alongside the stone forest, that together with the open plains and lively rivers make up Liyue's bountiful landscape, which shows its unique beauty through each of the four seasons. Just how many gifts from the Geo God lie in wait amongst the rocks of Liyue's mountains?"
    },
    {
        id: 4,
        name: 'Inazuma',
        img: map4,
        icon: icon3,
        desc1: 'An Isolated Archipelago Far East of Teyvat.',
        desc: 'Overcome endless thunderstorms and set foot on the islands of red maple and cherry blossoms. On winding shores and towering cliffs, and in forests and mountains full of secrets, witness the Eternity pursued by Her Excellency, the Almighty Narukami Ogosho.'
    },
    {
        id: 5,
        name: 'Sumeru',
        img: map5,
        icon: icon4,
        desc1: 'The city of scholars located in the west-central part of Teyvat.',
        desc: 'A fantastical nation of both lush rainforest and barren desert, where countless fruits of wisdom grow and are buried. Whether Travelers travel from afar through the forest to reach the academy city or delve deep into the desert to discover the historical ruins of the red desert, a wealth of valuable knowledge awaits them here.'
    },
    {
        id: 6,
        name: 'Fontaine',
        img: map6,
        icon: icon5,
        desc1: 'A terrestrial sea in the center of Teyvat.',
        desc: 'Following the direction of pure currents, crossing wilderness, the depths of the forests and vastness of the sea of sand, arriving at the origin of all the waters of the continent. At the top of the waterfall, in the depths of the capital atop the terrestrial sea... a story that has never been heard, a legend that has been forgotten, like a lost kingdom sunken beneath the waves, yearning for a bard to sing its drowned songs.'
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
                            <div className={styles.img}><img src={map.icon} /></div>
                            <div className={styles.habitats}>{map.name}</div>
                            <div className={styles.text}>
                                <p className={styles.prevText}>{map.desc1}</p>
                                <p className={styles.afterText}>{map.desc}</p>
                            </div>
                            <button className={styles.detail}>
                                <p>View details</p>
                            </button>
                        </SwiperSlide>
                    </>
                })}


            </Swiper>
        </>
    );
}

export default Maps;

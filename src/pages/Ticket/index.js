// import React from 'react';
// import logo from '~/assets/img/t1.jpg';

// import NormalBanner from '~/component/Layout/components/NormalBanner';
// import styles from './Ticket.module.scss';

// function Ticket() {
//     return (
//         <>
//             <div className={styles.imgbanner}>
//                 <NormalBanner />
//             </div>
//             <div className={styles.container}>
//                 <div className={styles.void}>
//                     <div className={styles.col1}>
//                         <header className={styles.ce_header}>
//                             <h1 className={styles.ce_headline}>Welcome to SaiGon Zoo!!</h1>
//                         </header>
//                         <div className={styles.rte}>
//                             <p className={styles.text_center}>
//                                 Zoo Berlin is in a class of its own! Not only is it the oldest and most frequently
//                                 visited zoo in the country, it is also home to the largest variety of species of any zoo
//                                 in the world
//                             </p>
//                         </div>
//                     </div>
//                     <div className={styles.col}>
//                         <div className={styles.header}>
//                             <h2 className={styles.headline}>Tickets</h2>
//                         </div>
//                     </div>
//                     <div className={styles.col}>
//                         <div className={styles.slider_waraper}>
//                             <div className={styles.swiper_warpper}>
//                                 <div className={styles.card}>
//                                     <a
//                                         href="http://localhost:3000/ticket"
//                                         title="Book now"
//                                         className={styles.link_cover}
//                                     >
//                                         Book now
//                                     </a>
//                                     <div className={styles.content}>
//                                         <div className={styles.text_wrapper}>
//                                             <h1 className={styles.text}>Adult Tickets</h1>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className={styles.card}>
//                                     <a
//                                         href="http://localhost:3000/ticket"
//                                         title="Book now"
//                                         className={styles.link_cover}
//                                     >
//                                         Book now
//                                     </a>
//                                     <div className={styles.content}>
//                                         <div className={styles.text_wrapper}>
//                                             <h1 className={styles.text}>Children Tickets</h1>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.row}>
//                     <div className={styles.col}>
//                         <form id={styles.artical_form} action="" method="POST">
//                             <div className={styles.card}>
//                                 <div className={styles.card_header}>
//                                     <h5>Please select your items</h5>
//                                 </div>
//                                 <div className={styles.table}>
//                                     <div className={styles.tbody}>
//                                         <div className={styles.table_row}>
//                                             <div className={styles.col_name}>
//                                                 <b>Ticket SaiGon Zoo - Adult</b>
//                                                 <br />" aged from 16 "
//                                             </div>
//                                             <div className={styles.col_qty}>
//                                                 <div className={styles.input}>
//                                                     <input type="number" min={0}></input>
//                                                 </div>
//                                                 <div className={styles.col_price}>60.000VND</div>
//                                             </div>
//                                         </div>
//                                         <div className={styles.table_row}>
//                                             <div className={styles.col_name}>
//                                                 <b>Ticket SaiGon Zoo - Child</b>
//                                                 <br />" aged 4 to 15 "
//                                             </div>
//                                             <div className={styles.col_qty}>
//                                                 <div className={styles.input}>
//                                                     <input type="number" min={0}></input>
//                                                 </div>
//                                                 <div className={styles.col_price}>40.000VND</div>
//                                             </div>
//                                         </div>
//                                         <div className={styles.table_row}>
//                                             <div className={styles.col_name}>
//                                                 <b>Ticket SaiGon Zoo - Child</b>
//                                                 <br />" aged under 4 "
//                                             </div>
//                                             <div className={styles.col_qty}>
//                                                 <div className={styles.input}>
//                                                     <input type="number" min={0}></input>
//                                                 </div>
//                                                 <div className={styles.col_price}>FREE</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className={styles.table_row_sum}>
//                                         <b className={styles.col}>Total price</b>
//                                         <div className={styles.col_price}>
//                                             <span className={styles.show_sum}>
//                                                 <span></span>
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Ticket;

import React from 'react'
import styles from './Ticket.module.scss'
import NormalBanner from '~/component/Layout/components/NormalBanner'
import { useState } from "react";
import { Prev } from 'react-bootstrap/esm/PageItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

function Ticket() {
    const [setTotalPrice] = useState(0)
    // set adult
    const [value1, setValue1] = useState(0)
    const PlusPrice = () => {
        setValue1(value1 + 1)
    }
    const MinPrice = () => {
        if (value1 > 0) { setValue1(value1 - 1) }

    }
    // set 4 <= children < 15
    const [value2, setValue2] = useState(0)
    const PlusPrice2 = () => {
        setValue2(value2 + 1)
    }
    const MinPrice2 = () => {
        if (value2 > 0) { setValue2(value2 - 1) }

    }
    // set children < 4
    const [value3, setValue3] = useState(0)
    const PlusPrice3 = () => {
        setValue3(value3 + 1)
    }
    const MinPrice3 = () => {
        if (value3 > 0) { setValue3(value3 - 1) }

    }
    // set event
    const [value4, setValue4] = useState(0)
    const PlusPrice4 = () => {
        setValue4(value4 + 1)
    }
    const MinPrice4 = () => {
        if (value3 > 0) { setValue4(value3 - 1) }

    }


    return (<>
        <div className={styles.imgbanner}>
            <NormalBanner />
        </div>
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.welcome}>Welcome to SaiGon</div>
                <div className={styles.welcome_description}>Get Zoo Ticket Now!!!</div>
            </div>
        </div>
        <div className={styles.table_container}>
            <table className={styles.table}>
                <tr className={styles.table_row}>
                    <th className={styles.table_header}>Ticket</th>
                    <th className={styles.table_header}>Quantity</th>
                    <th className={styles.table_header}>Price</th>
                </tr>
                <tr className={styles.table_row}>
                    <td className={styles.table_data}>Adult</td>
                    <div className={styles.input}>
                        <div onClick={MinPrice}><AiOutlineMinus /></div>
                        <td className={styles.table_data}>
                            <div>{value1}</div>
                        </td>
                        <div onClick={PlusPrice}>
                            <AiOutlinePlus />
                        </div>
                    </div>
                    <td className={styles.table_data}>60.000</td>
                </tr>
                <tr className={styles.table_row}>
                    <td className={styles.table_data}>Chilren</td>
                    <div className={styles.input}>
                        <div onClick={MinPrice2}><AiOutlineMinus /></div>
                        <td className={styles.table_data}>
                            <div>{value2}</div>
                        </td>
                        <div onClick={PlusPrice2}>
                            <AiOutlinePlus />
                        </div>
                    </div>
                    <td className={styles.table_data}>40.000</td>
                </tr>
                <tr className={styles.table_row}>
                    <td className={styles.table_data}>Children</td>
                    <div className={styles.input}>
                        <div onClick={MinPrice3}><AiOutlineMinus /></div>
                        <td className={styles.table_data}>
                            <div>{value3}</div>
                        </td>
                        <div onClick={PlusPrice3}>
                            <AiOutlinePlus />
                        </div>
                    </div>
                    <td className={styles.table_data}>Free</td>
                </tr>
                <tr className={styles.table_row}>
                    <td className={styles.table_data}>Event</td>
                    <div className={styles.input}>
                        <div onClick={MinPrice4}><AiOutlineMinus /></div>
                        <td className={styles.table_data}>
                            <div>{value4}</div>
                        </td>
                        <div onClick={PlusPrice4}>
                            <AiOutlinePlus />
                        </div>
                    </div>
                    <td className={styles.table_data}>120.000</td>
                </tr>
                <tr className={styles.table_row}>
                    <td className={styles.table_data}>Total Price</td>
                    <td colSpan='2' className={styles.table_data}>{value1 * 60000 + value2 * 40000 + value4 * 120000}</td>
                </tr>
            </table>
        </div>
    </>)
}

export default Ticket



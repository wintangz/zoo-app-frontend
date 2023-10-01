import React from 'react';
import logo from '~/assets/img/t1.jpg';

import NormalBanner from '~/component/Layout/components/NormalBanner';
import styles from './Ticket.module.scss';

function Ticket() {
    return (
        <>
            <NormalBanner />
            <div className={styles.container}>
                <div className={styles.void}>
                    <div className={styles.col1}>
                        <header className={styles.ce_header}>
                            <h1 className={styles.ce_headline}>Welcome to SaiGon Zoo!!</h1>
                        </header>
                        <div className={styles.rte}>
                            <p className={styles.text_center}>
                                Zoo Berlin is in a class of its own! Not only is it the oldest and most frequently
                                visited zoo in the country, it is also home to the largest variety of species of any zoo
                                in the world
                            </p>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.header}>
                            <h2 className={styles.headline}>Tickets</h2>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.slider_waraper}>
                            <div className={styles.swiper_warpper}>
                                <div className={styles.card}>
                                    <a
                                        href="http://localhost:3000/ticket"
                                        title="Book now"
                                        className={styles.link_cover}
                                    >
                                        Book now
                                    </a>
                                    <div className={styles.content}>
                                        <div className={styles.text_wrapper}>
                                            <h1 className={styles.text}>Adult Tickets</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.card}>
                                    <a
                                        href="http://localhost:3000/ticket"
                                        title="Book now"
                                        className={styles.link_cover}
                                    >
                                        Book now
                                    </a>
                                    <div className={styles.content}>
                                        <div className={styles.text_wrapper}>
                                            <h1 className={styles.text}>Children Tickets</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <form id={styles.artical_form} action="" method="POST">
                            <div className={styles.card}>
                                <div className={styles.card_header}>
                                    <h5>Please select your items</h5>
                                </div>
                                <div className={styles.table}>
                                    <div className={styles.tbody}>
                                        <div className={styles.table_row}>
                                            <div className={styles.col_name}>
                                                <b>Ticket SaiGon Zoo - Adult</b>
                                                <br />" aged from 16 "
                                            </div>
                                            <div className={styles.col_qty}>
                                                <div className={styles.input}>
                                                    <input type="number" min={0}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.table_row}>
                                            <div className={styles.col_name}>
                                                <b>Ticket SaiGon Zoo - Child</b>
                                                <br />" aged 4 to 15 "
                                            </div>
                                            <div className={styles.col_qty}>
                                                <div className={styles.input}>
                                                    <input type="number" min={0}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.table_row}>
                                            <div className={styles.col_name}>
                                                <b>Ticket SaiGon Zoo - Child</b>
                                                <br />" aged under 4 "
                                            </div>
                                            <div className={styles.col_qty}>
                                                <div className={styles.input}>
                                                    <input type="number" min={0}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ticket;

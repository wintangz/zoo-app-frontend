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
                    <div className={styles.col}>
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
            </div>
        </>
    );
}

export default Ticket;

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
                        <div className={styles.header}>
                            <h2 className={styles.headline}>Tickets</h2>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.slider_waraper}>
                            <div className={styles.swiper_warpper}>
                                <div className={styles.card}>
                                    <a href="" title="Book now" className={styles.link_cover}>
                                        Book now
                                    </a>
                                    <h1 className={styles.content}>
                                        book now book now book now book now book now book now book now book now book now
                                        book now book now book now book now book now book now book now book now book now
                                        book now book now book now book now book now book now book now book now book now
                                        book nowbook now book now book now book now book now book now book now book now
                                        book now
                                    </h1>
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

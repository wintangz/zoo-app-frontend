import React from 'react';
import logo from '~/assets/img/t1.jpg';

import NormalBanner from '~/component/Layout/components/NormalBanner';
import styles from './Ticket.module.scss';

function Ticket() {
    return (
        <>
            <NormalBanner>
                <img src={logo} />
            </NormalBanner>
            <h1>ticket</h1>
        </>
    );
}

export default Ticket;

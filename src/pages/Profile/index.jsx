import React from "react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';
import styles from './Profile.module.scss'

import { logout } from '~/api/userService';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';

function Profile() {


    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        res.then((result) => {
            if (result.status === 200) {
                localStorage.removeItem('token');
                window.location = '/';
            }
        });
    };

    return (
        <>
            <div className={styles.background}>
                <NormalBanner />
            </div>
            <Button
                variant="contained"
                sx={{ width: '70%', marginTop: '2vh', marginBottom: '4vh' }}
                onClick={handleLogout}
            >
                <LogoutOutlinedIcon /> {<div>Logout</div>}
            </Button>

        </>
    );
}

export default Profile;
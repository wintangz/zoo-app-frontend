import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import styles from './Profile.module.scss';

import { useNavigate } from 'react-router-dom';
import { logout } from '~/api/userService';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import { useAppContext } from "~/context/Context";

function Profile() {
    const { auth, setAuth } = useAppContext()
    const nav = useNavigate()
    useEffect(() => {
        console.log(auth);
        if (!auth) {
            nav('/')
        }
    }, [auth, nav])

    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        res.then((result) => {
            if (result.status === 200) {
                setAuth(false)
                localStorage.removeItem('token');
                nav('/')
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
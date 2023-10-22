import { Box, IconButton, Typography, useTheme, Avatar, ListItemButton, List, ListItem, ListItemIcon, ListItemText, Button, Dialog, DialogContent } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import { useAppContext } from "~/context/Context";

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { logo_long_dark } from '~/utils/assets-src';
import { logout } from '~/api/userService';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import { getUserById } from '~/api/userService';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

let role = null;
if (localStorage.getItem('token')) {
    role = decode(localStorage.getItem('token')).roles[0];
}

const SidebarUser = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const nav = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('');

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState('');
    const handleAvatarClick = () => {
        // When the avatar is clicked, open the modal and set the image URL
        setIsImageModalOpen(true);
        setEnlargedImageUrl(initialValues.avatarUrl);
    };

    const [users, setUsers] = useState({});

    const fetchapi = async (id) => {
        const result = await getUserById(id);
        return result;
    };
    const newObj = decode(localStorage.getItem('token'));
    useEffect(() => {
        const res = fetchapi(newObj.sub);
        res.then((result) => {
            setUsers(result);
        });
    }, []);

    const { auth, setAuth } = useAppContext()

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

    const initialValues = {
        lastname: users?.lastname || '',
        avatarUrl: users?.avatarUrl || '',
    };

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`,
                    height: '90vh',
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important',
                },
                '& .pro-inner-item:hover': {
                    color: '#868dfb !important',
                },
                '& .pro-menu-item.active': {
                    color: '#6870fa !important',
                },
                '& .MuiBox-root': {
                    height: '100%',
                    paddingBottom: '5%',
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed} sx={{ height: '10vh' }}>
                <Menu iconShape="square" initialValues={initialValues}>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" >
                                <Typography >
                                    <img src={logo_long_dark} style={{ width: '130px' }} />
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Avatar
                                    src={initialValues.avatarUrl || "broken-image.jpg"}

                                    sx={{ width: 120, height: 120, cursor: 'pointer' }}
                                    onClick={handleAvatarClick} // Open the modal when the avatar is clicked
                                />

                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h5" color='rgb(248, 191, 2)' fontWeight='bold'>
                                    {initialValues.lastname}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ fontSize: '2rem !important' }}>
                                    <Item

                                        title="Profile"
                                        to="/profile"
                                        icon={<HomeIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </ListItemButton>

                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Item
                                        title="Sercurity"
                                        to="/profile/sercurity"
                                        icon={<LockIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <Button
                            variant="contained"
                            sx={{
                                color: 'white', // Text color
                                backgroundColor: 'rgb(248, 191, 2)',
                                width: '70%',
                                marginTop: '6vh',
                                marginLeft: '2vh',
                                '&:hover': {
                                    backgroundColor: 'rgb(218, 161, 2)',
                                },
                            }}
                            onClick={handleLogout}
                        >
                            <LogoutOutlinedIcon /> {!isCollapsed && <div>Logout</div>}
                        </Button>
                        <Dialog open={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
                            <DialogContent>
                                <img
                                    src={enlargedImageUrl}
                                    alt="Enlarged Avatar"
                                    style={{ width: '100%' }}
                                />

                            </DialogContent>
                            <Button
                                variant="outlined"
                            >
                                Edit Avatar
                            </Button>
                        </Dialog>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default SidebarUser;

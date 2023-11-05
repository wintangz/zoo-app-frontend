import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Box, Button, Dialog, DialogContent, FormControl, IconButton, Input, List, ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById, logout, updateUser } from '~/api/userService';
import { tokens } from '~/theme';
import { logo_long_dark } from '~/utils/assets-src';
import { decode } from '~/utils/axiosClient';
import uploadFile from '~/utils/transferFile';


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

const SidebarUser = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const nav = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('');

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarUpdated, setAvatarUpdated] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleAvatarClick = () => {
        setIsImageModalOpen(true);
        setEnlargedImageUrl(initialValues.avatarUrl);
    };

    const [users, setUsers] = useState({});

    const id = decode(localStorage.getItem('token'));
    const fetchapi = async (id) => {
        const result = await getUserById(id);
        console.log(result);
        return result;
    };
    useEffect(() => {
        const res = fetchapi(id.sub);
        res.then((result) => {
            setUsers(result);
        });
    }, [avatarUpdated]);

    // const { auth, setAuth } = useAppContext()

    // useEffect(() => {
    //     console.log(auth);
    //     if (!auth) {
    //         nav('/')
    //     }
    // }, [auth, nav])

    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        res.then((result) => {
            if (result.status === 200) {
                localStorage.removeItem('token');
                nav('/')
            }
        });
    };
    const handleSubmit = async (values) => {
        try {
            if (values.avatarUrl instanceof File) {
                const avatarURL = await uploadFile(selectedFile, 'update-avataruser');
                values.avatarUrl = avatarURL;
            }
            console.log(values)
            const res = updateUser(id.sub, values);
            res.then((result) => {
                console.log(result);
                const status = result.status;
                if (status === 200) {
                    setIsImageModalOpen(false);
                    setAvatarUpdated(initialValues.avatarUrl);
                } else {
                    console.log(result);
                }
            });
        } catch (error) {
            console.log(error)
        }

    };

    const initialValues = {
        lastname: users?.lastname || '',
        firstname: users?.firstname || '',
        avatarUrl: users?.avatarUrl || '',
        status: true,
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
            <ProSidebar collapsed={isCollapsed} sx={{ height: '10vh', zIndex: -100000 }}>
                <Menu iconShape="square" initialValues={initialValues}>
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
                                    onClick={handleAvatarClick}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h5" color='rgb(248, 191, 2)' fontWeight='bold'>
                                    {initialValues.lastname} {initialValues.firstname}
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
                                        to="/settings/profile"
                                        icon={<HomeIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </ListItemButton>

                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <Item
                                        title="Security"
                                        to="/settings/security"
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
                                color: 'white',
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
                            <FormControl component="fieldset" sx={{ paddingLeft: "10px" }}>
                                <Input
                                    type="file"
                                    label="avatarUrl"
                                    onChange={handleFileSelect}
                                    name="avatarUrl"
                                />
                            </FormControl>
                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={() => {
                                    handleSubmit(
                                        { avatarUrl: selectedFile }
                                    )
                                }}
                            >
                                Edit Avatar
                            </Button>
                        </Dialog>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
};

export default SidebarUser;

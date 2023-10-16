import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { logout } from '~/api/data/mockData';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
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

const Sidebar = () => {
    // Menu CRUD Staff
    const [openStaff, setOpenStaff] = useState(false);

    const handleStaff = () => {
        setOpenStaff(!openStaff);
    };

    // Menu CRUD Ticket
    const [openTicket, setOpenTicket] = useState(false);

    const handleTicket = () => {
        setOpenTicket(!openTicket);
    };

    // Menu CRUD Animal
    const [openAnimal, setOpenAnimal] = useState(false);
    const handleAnimal = () => {
        setOpenAnimal(!openAnimal);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        console.log(res);
        res.then((result) => {
            if (result.status === 200) {
                localStorage.removeItem('token');
                window.location = '/';
            }
        });
    };
    const userRole = decode(localStorage.getItem('token')).roles[0];
    let titleData = '';
    let titleCreate = '';
    let titleUpdate = '';
    let titleNews = '';
    let primary = '';

    if (userRole === 'ADMIN') {
        titleData = 'View All User';
        titleCreate = 'Create New Staff';
        titleUpdate = 'Update Staff';
        primary = 'Manage Staff';
    } else if (userRole === 'STAFF') {
        titleData = 'View All Zoo Trainer';
        titleCreate = 'Create New Zoo Trainer';
        titleNews = 'View All News';
        primary = 'Manage Zoo Trainer';
    }
    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`,
                    height: '100vh',
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
            <ProSidebar collapsed={isCollapsed} sx={{ height: '100%' }}>
                <Menu iconShape="square">
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
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    {userRole}
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
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: '10px 0 0 0' }}
                                >
                                    {decode(localStorage.getItem('token')).sub}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {role}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                            Data
                        </Typography>
                        <Item
                            title={titleData}
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {userRole === 'STAFF' && (
                            <Item
                                title={titleNews}
                                to="/viewallnew"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {userRole === 'STAFF' && (
                            <Item
                                title="Create News"
                                to="/create/news"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                            Pages
                        </Typography>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', margin: 0 }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton
                                onClick={handleStaff}
                                sx={{ padding: '8px 4px 8px 0', marginRight: '16px' }}
                            >
                                <ListItemIcon sx={{ paddingLeft: '10px', justifyContent: ' space-around' }}>
                                    <InboxIcon />
                                </ListItemIcon>
                                {!isCollapsed && <ListItemText primary={primary} sx={{ paddingLeft: '4px' }} />}
                                {openStaff ? <ExpandLess /> : <ExpandMore />}
                                {/* {!isCollapsed && <ListItemText primary={primary} sx={{ paddingLeft: '4px' }} />}
                                {open ? <ExpandLess /> : <ExpandMore />} */}
                            </ListItemButton>
                            <Collapse in={openStaff} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton>
                                        <Item
                                            title={titleCreate}
                                            to="/staff/form"
                                            icon={<PersonOutlinedIcon />}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    </ListItemButton>
                                    {userRole === 'ADMIN' && (
                                        <ListItemButton>
                                            <Item
                                                title={titleUpdate}
                                                to="/staff/update"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </ListItemButton>
                                    )}
                                </List>
                            </Collapse>
                        </List>
                        {userRole === 'ADMIN' && (
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', margin: 0 }}
                                component="nav"
                                aria-labelledby="ticket"
                            >
                                <ListItemButton
                                    onClick={handleTicket}
                                    sx={{ padding: '8px 4px 8px 0', marginRight: '16px' }}
                                >
                                    <ListItemIcon sx={{ paddingLeft: '10px', justifyContent: ' space-around' }}>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    {!isCollapsed && (
                                        <ListItemText primary="Manage Ticket" sx={{ paddingLeft: '4px' }} />
                                    )}
                                    {openTicket ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openTicket} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton>
                                            <Item
                                                title="View Ticket"
                                                to="/tickets/view"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <Item
                                                title="Create Ticket"
                                                to="/tickets/create"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </ListItemButton>
                                        {/* <ListItemButton>
                                        {role === 'ADMIN' && (
                                            <Item
                                                title="Update Staff"
                                                to="/staff/update"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        )}
                                    </ListItemButton> */}
                                    </List>
                                </Collapse>
                            </List>
                        )}
<<<<<<< Updated upstream
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', margin: 0 }}
                            component="nav"
                            aria-labelledby="animal"
                        >
                            <ListItemButton
                                onClick={handleAnimal}
                                sx={{ padding: '8px 4px 8px 0', marginRight: '16px' }}
=======



                        {userRole === 'ADMIN' && (
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', margin: 0 }}
                                component="nav"
                                aria-labelledby="animal"
>>>>>>> Stashed changes
                            >
                                <ListItemButton
                                    onClick={handleAnimal}
                                    sx={{ padding: '8px 4px 8px 0', marginRight: '16px' }}
                                >
                                    <ListItemIcon sx={{ paddingLeft: '10px', justifyContent: ' space-around' }}>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    {!isCollapsed && <ListItemText primary="Manage Animal" sx={{ paddingLeft: '4px' }} />}
                                    {openAnimal ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openAnimal} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton>
                                            <Item
                                                title="Create Animal"
                                                to="/animal/create"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </ListItemButton>

                                        {/* {role === 'ADMIN' && (
                                        <ListItemButton>
                                            <Item
                                                title="Create Ticket"
                                                to="/tickets/create"
                                                icon={<PersonOutlinedIcon />}
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        </ListItemButton>
                                    )} */}
                                    </List>
                                </Collapse>
                            </List>
                        )}
                        <Button
                            variant="contained"
                            sx={{ width: '70%', marginTop: '2vh', marginBottom: '4vh' }}
                            onClick={handleLogout}
                        >
                            <LogoutOutlinedIcon /> {!isCollapsed && <div>Logout</div>}
                        </Button>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;

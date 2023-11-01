import { Avatar, Box, Dialog, DialogContent, FormControl, IconButton, Input, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForestIcon from '@mui/icons-material/Forest';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import { BsFillTicketPerforatedFill, BsNewspaper, BsQrCodeScan } from 'react-icons/bs';
import { FaBalanceScale } from 'react-icons/fa';
import { GiCage, GiElephant } from 'react-icons/gi';
import { TbMeat } from 'react-icons/tb';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { getUserById, logout, updateUser } from '~/api/userService';
import { tokens } from '~/theme';
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

    // Menu CRUD Cage
    const [openEnclosure, setOpenEnclosure] = useState(false);
    const handleEnclosure = () => {
        setOpenEnclosure(!openEnclosure);
    };

    // Menu CRUD Zone
    const [openHabitat, setOpenHabitat] = useState(false);
    const handleHabitat = () => {
        setOpenHabitat(!openHabitat);
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
            } else {
                localStorage.removeItem('token');
                window.location = '/';
            }
        });
    };

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarUpdated, setAvatarUpdated] = useState(null);
    const [users, setUsers] = useState({});
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
        avatarUrl: users?.avatarUrl || '',
        lastname: users?.lastname || '',
        firstname: users?.firstname || '',
    };
    const userRole = decode(localStorage.getItem('token')).roles[0];
    let titleData = '';
    let titleNews = '';

    if (userRole === 'ADMIN') {
        titleData = 'Users';
    } else if (userRole === 'STAFF') {
        titleData = 'Zoo Trainers';
        titleNews = 'News';
    }
    else if (userRole === 'ZOO_TRAINER') {
    }
    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[900]}!important`,
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
                // '& .pro-sidebar': {
                //     backgroundColor
                // },

            }}
        >
            <ProSidebar style={{ height: '100%', background: colors.primary[900] }}>
                <Menu iconShape="square" initialValues={initialValues}>
                    {/* LOGO AND MENU ICON */}
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: "10%" }}>
                            <Avatar
                                src={initialValues.avatarUrl || "broken-image.jpg"}
                                sx={{ width: 120, height: 120, cursor: 'pointer' }}
                                onClick={handleAvatarClick}
                            />

                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h3"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: '10px 0 0 0' }}
                            >
                                {initialValues.lastname} {initialValues.firstname}
                            </Typography>
                            <Typography variant="h5" color={colors.greenAccent[500]}>
                                {role}
                            </Typography>
                        </Box>
                    </Box>


                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
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

                        {userRole !== 'ZOO_TRAINER' && (
                            <>
                                <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                                    Data
                                </Typography>
                                <Item
                                    title={titleData}
                                    to="/home"
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}

                        {userRole === 'STAFF' && (
                            <>
                                <Item
                                    title="Customers"
                                    to="/home/customers"
                                    icon={<AccountCircleIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title={titleNews}
                                    to="/home/news"
                                    icon={<BsNewspaper />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Orders"
                                    to="/home/orders"
                                    icon={<ShoppingCartIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="View Purchased Tickets"
                                    to="/home/purchased_tickets"
                                    icon={<BookOnlineIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Check ticket"
                                    to="/home/check_ticket"
                                    icon={<BsQrCodeScan />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {userRole === 'ADMIN' && (
                            <>

                                <Item
                                    title="Ticket types"
                                    to="/home/tickets"
                                    icon={<BsFillTicketPerforatedFill />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                            </>
                        )}
                        {userRole === "STAFF" && <Item
                            title="Animals"
                            to="/home/animals"
                            icon={<GiElephant />}
                            selected={selected}
                            setSelected={setSelected}
                        />}

                        {userRole === 'ZOO_TRAINER' && (
                            <>
                                <List
                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', margin: 0 }}
                                    component="nav"
                                    aria-labelledby="animal"
                                >
                                    <ListItemButton
                                        onClick={handleAnimal}
                                        sx={{ padding: '8px 4px 8px 0', marginRight: '16px' }}
                                    >
                                        <ListItemIcon sx={{ paddingLeft: '10px', justifyContent: ' space-around' }}>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        {!isCollapsed && <ListItemText primary="Manage Animals" sx={{ paddingLeft: '4px' }} />}
                                        {openAnimal ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openAnimal} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>

                                            <ListItemButton>
                                                <Item
                                                    title="Animals"
                                                    to="/home/animals"
                                                    icon={<GiElephant />}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                />
                                            </ListItemButton>


                                            <ListItemButton>
                                                <Item
                                                    title="Feed Schedules"
                                                    to="/home/animals/schedule"
                                                    icon={<PetsIcon />}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                />
                                            </ListItemButton>
                                            <ListItemButton>
                                                <Item
                                                    title="Health Records"
                                                    to="/home/animals/health"
                                                    icon={<PersonOutlinedIcon />}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                />
                                            </ListItemButton>

                                        </List>
                                    </Collapse>
                                </List>

                                <Item
                                    title="Foods"
                                    to="/home/foods"
                                    icon={<TbMeat />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Diets"
                                    to="/home/diets"
                                    icon={<FaBalanceScale />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Species"
                                    to="/home/species"
                                    icon={<GiCage />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {userRole === "ZOO_TRAINER" && (
                            <>
                                <Item
                                    title="Enclosure"
                                    to="/home/enclosures"
                                    icon={<HouseSidingIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Habitat"
                                    to="/home/habitats"
                                    icon={<ForestIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {userRole === "STAFF" && (
                            <>
                                <Item
                                    title="Enclosure"
                                    to="/home/enclosures"
                                    icon={<HouseSidingIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Habitat"
                                    to="/home/habitats"
                                    icon={<ForestIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
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

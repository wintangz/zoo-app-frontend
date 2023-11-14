import { Avatar, Box, Dialog, DialogContent, FormControl, Input, Typography, useTheme } from '@mui/material';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import { useEffect } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { getUserById, logout, updateUser } from '~/api/userService';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import uploadFile from '~/utils/transferFile';
import { GiLion } from 'react-icons/gi'
import { CalendarMonthOutlined, ConfirmationNumberOutlined, ForestOutlined, FoundationOutlined, InsightsOutlined, LocalDiningOutlined, MonitorHeartOutlined, NewspaperOutlined, PeopleAltOutlined, PetsOutlined, QrCodeScannerOutlined, RestaurantMenuOutlined, ShoppingCartOutlined } from '@mui/icons-material';
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
        localStorage.removeItem('token');
        window.location = '/';
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
                values.status = true;
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

    const userRoles = decode(localStorage.getItem('token')).roles;

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[900]}!important`,
                    height: '100%',
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
                                className='text-2xl'
                            >
                                {initialValues.lastname} {initialValues.firstname}
                            </Typography>
                            <Typography className='text-amber-400 font-bold text-xl'>
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

                        <Item
                            title='Dashboard'
                            to="/dashboard"
                            icon={<InsightsOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {userRoles.includes('ADMIN') &&
                            <>
                                <Item
                                    title='Users'
                                    to="/dashboard/users"
                                    icon={<PeopleAltOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Ticket types"
                                    to="/dashboard/tickets"
                                    icon={<ConfirmationNumberOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        }

                        {userRoles.includes('STAFF') && !userRoles.includes('ADMIN') &&
                            <>
                                <Item
                                    title="Customers"
                                    to="/dashboard/customers"
                                    icon={<PeopleAltOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Zoo Trainers"
                                    to="/dashboard/zoo_trainers"
                                    icon={<PeopleAltOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        }
                        {userRoles.includes('STAFF') &&
                            <>
                                <Item
                                    title='News'
                                    to="/dashboard/news"
                                    icon={<NewspaperOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Orders"
                                    to="/dashboard/orders"
                                    icon={<ShoppingCartOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/* <Item
                                    title="Purchased Tickets"
                                    to="/home/purchased_tickets"
                                    icon={<BookOnlineIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> */}
                                <Item
                                    title="Check ticket"
                                    to="/dashboard/ticket_check"
                                    icon={<QrCodeScannerOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        }
                        {(userRoles.includes('STAFF') || userRoles.includes('ZOO_TRAINER')) &&
                            <>
                                <Item
                                    title="Animals"
                                    to="/dashboard/animals"
                                    icon={<GiLion className='w-9 h-9' />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Enclosures"
                                    to="/dashboard/enclosures"
                                    icon={<FoundationOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Habitats"
                                    to="/dashboard/habitats"
                                    icon={<ForestOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>}

                        {userRoles.includes('ZOO_TRAINER') && (
                            <>
                                <Item
                                    title="Feed Schedules"
                                    to="/dashboard/animals/feeding"
                                    icon={<CalendarMonthOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Health Records"
                                    to="/dashboard/animals/health"
                                    icon={<MonitorHeartOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />


                                <Item
                                    title="Foods"
                                    to="/dashboard/foods"
                                    icon={<LocalDiningOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/* <Item
                                    title="Diets"
                                    to="/home/diets"
                                    icon={<FaBalanceScale />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> */}
                                <Item
                                    title="Species"
                                    to="/dashboard/species"
                                    icon={<PetsOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                            </>
                        )}
                        <Button
                            onClick={handleLogout}
                            className='ml-4 bg-amber-400 border-0 my-5 px-6'
                            label='Log out'
                            icon="pi pi-sign-out"
                            size='small'
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;

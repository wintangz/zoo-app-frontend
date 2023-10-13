import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '~/theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { logout } from '~/api/data/mockData';
const Topbar = () => {
    const handleLogout = () => {
        const res = logout(localStorage.getItem('token'));
        res.then((result) => {
            if (result.status === 200) {
                localStorage.removeItem('token');
                window.location = '/';
            }
        });
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="inline-block" p={2} sx={{ float: 'right' }}>
            {/* SEARCH BAR */}
            {/* <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box> */}
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <IconButton>
                            <PersonOutlinedIcon />
                        </IconButton>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Link to="/edit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                        </Link>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Box>
        </Box>
    );
};

export default Topbar;

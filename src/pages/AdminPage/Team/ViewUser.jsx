import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as mockData from '~/api/userService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import { getUsersWithRoles } from '~/utils/getUserByRole';
import Actions from './actions';

function Team() {
    const navigate = useNavigate();
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note that months are zero-based
        const year = date.getFullYear();

        // Use template literals to format the date
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    const [users, setUsers] = useState(null);
    const fetchapi = async () => {
        const result = await mockData.getUser();
        result.map((element) => {
            element.roles.map((role) => {
                if (role.name === 'ZOO_TRAINER') {
                    return (role.name = 'TRAINER');
                }
            });
            const formattedDate = formatDate(element.dateOfBirth);
            return element.dateOfBirth = formattedDate;
        });
        setUsers(result);
        console.log(users);
    };

    const getZooTrainer = async () => {
        const result = await mockData.getZooTrainer();
        console.log(result);
        const mdata = getUsersWithRoles(result, ['ZOO_TRAINER']);
        setUsers(mdata);
    };
    const [remove, setRemove] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = decode(token).roles;
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            if (role === 'ADMIN') {
                fetchapi();
                break; // Break out of the loop
            }
            if (role === 'STAFF') {
                getZooTrainer();
            }
        }
    }, [remove]);
    const userRole = decode(localStorage.getItem('token')).roles[0];
    let title = '';
    let subtitle = '';
    let button = '';

    if (userRole === 'ADMIN') {
        title = 'User Management';
        subtitle = 'Show user info';
        button = 'Create New Staff';
    } else if (userRole === 'STAFF') {
        title = 'Zoo Trainer Management';
        subtitle = 'Show zoo trainer info';
        button = 'Create New Zoo Trainer';
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'firstname', // Keep the field as 'firstname'
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
            valueGetter: (params) => `${params.row.lastname} ${params.row.firstname}`,
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date of Birth',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'nationality',
            headerName: 'Nationality',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'address',
            headerName: 'Address',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'roles',
            headerName: 'Access Level',
            flex: 1,
            valueGetter: (params) => {
                // Assuming 'roles' is an array of objects with 'name' property
                const roleNames = params.row.roles.map((role) => role.name).join(', ');
                return roleNames;
            },
            renderCell: ({ row }) => {
                const roles = row.roles;
                return (
                    <Box
                        width="60%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={roles[0].name === 'ADMIN' ? colors.greenAccent[600] : colors.greenAccent[700]}
                        borderRadius="4px"
                    >
                        {roles[0].name === 'ADMIN' && <AdminPanelSettingsOutlinedIcon />}
                        {roles[0].name === 'STAFF' && <SecurityOutlinedIcon />}
                        {roles[0].name === 'TRAINER' && <PetsOutlinedIcon />}
                        {roles[0].name === 'CUSTOMER' && <AccountCircleOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {roles[0].name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 80,
            renderCell: (params) => <Actions {...{ params }} setRemove={setRemove} />,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title={title} subtitle={subtitle} />
            <Box display="flex" justifyContent="left">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/staff/create')}
                >
                    {button}
                </Button>
            </Box>
            <Box
                m="20px 0 0 0"
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                        marginLeft: '0px',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {users && (
                    <DataGrid
                        rows={users}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                )}
            </Box>
        </Box>
    );
}

export default Team;

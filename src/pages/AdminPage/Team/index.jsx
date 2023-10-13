import { Box, Typography, useTheme, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import { tokens } from '~/theme';
import * as mockData from '~/api/data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { useEffect, useState } from 'react';
import Actions from './actions.jsx';

function Team() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [remove, setRemove] = useState(null);
    const [users, setUsers] = useState(null);
    const fetchapi = async () => {
        const result = await mockData.getUser();
        console.log(result);
        result.map((element) => {
            element.roles.map((role) => {
                if (role.name === 'ZOO_TRAINER') {
                    return (role.name = 'TRAINER');
                }
            });
        });
        setUsers(result);
    };
    useEffect(() => {
        fetchapi();
    }, [remove]);

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
            headerName: 'Age',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'nationality',
            headerName: 'National',
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
            width: 150,
            renderCell: (params) => <Actions {...{ params }} setRemove={setRemove} />,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="User Management" subtitle="Show user info" />
            <Box
                m="40px 0 0 0"
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
                    />
                )}
            </Box>
        </Box>
    );
}

export default Team;

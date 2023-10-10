import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '~/theme';
import * as mockData from '~/api/data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { useEffect, useState } from 'react';

function Team() {
    const [users, setUsers] = useState(null);
    const fetchapi = async () => {
        const result = await mockData.getUser();
        setUsers(result);
    };
    useEffect(() => {
        fetchapi();
    }, []);

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
            field: 'birthDate',
            headerName: 'Age',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            flex: 1,
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
                        {roles[0].name === 'ZOO_TRAINER' && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {roles[0].name}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="User Management" subtitle="Managing the Team Members" />
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
                }}
            >
                {users && <DataGrid rows={users} columns={columns} getRowId={(row) => row.id} />}
            </Box>
        </Box>
    );
}

export default Team;

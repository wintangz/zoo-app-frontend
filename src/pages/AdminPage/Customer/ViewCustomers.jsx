import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as mockData from '~/api/userService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './Action';
import { Female, Male } from '@mui/icons-material';

function ViewCustomers() {
    const navigate = useNavigate();
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    const [customers, setCustomers] = useState(null);
    const fetchApi = async () => {
        const result = await mockData.getCustomers();
        result.map((element) => {
            const formattedDate = formatDate(element.dateOfBirth);
            return element.dateOfBirth = formattedDate;
        });
        setCustomers(result);
        console.log(customers);
    };
    const [remove, setRemove] = useState(null);

    useEffect(() => {
        fetchApi();
    }, [remove]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'firstname',
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
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'sex',
            headerName: 'Gender',
            valueGetter: (params) => params.row.sex ? "Male" : "Female",
            renderCell: ({ row }) => {
                const gender = row.sex;
                console.log(gender)
                return (
                    <Box
                        width="75%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                    >
                        <Typography color="white" sx={{ ml: '5px' }}>
                            {gender ? "Male" : "Female"}
                        </Typography>
                        {gender ? <Male /> : <Female />}

                    </Box>
                );
            },
        },
        {
            field: 'roles',
            headerName: 'Access Level',
            flex: 1,
            valueGetter: (params) => {
                // Assuming 'roles' is an array of objects with 'name' property
                const roleNames = params.row.roles.map((role) => {
                    if (role.name === "ZOO_TRAINER") {
                        return role.name = "TRAINER"
                    }
                    return role.name
                }).join(', ');
                return roleNames;
            },
            renderCell: ({ row }) => {
                const roles = row.roles;
                return (
                    <Box
                        width="75%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="flex-start"
                        backgroundColor={roles[0].name === 'ADMIN' ? colors.greenAccent[600] : colors.greenAccent[700]}
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                            {roles[0].name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            valueGetter: (params) => { return params.row.status ? "True" : "False" },
            renderCell: ({ row }) => {
                const status = row.status;
                return (
                    <Box
                        width="75%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={status ? "green" : "red"}
                        borderRadius="4px"
                    >
                        <Typography color="white" sx={{ ml: '5px' }}>
                            {status ? "True" : "False"}
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
            <AdminHeader title="View Customers" subtitle="Table of Customers" />
            <Box display="flex" justifyContent="left">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/customers/create')}
                >
                    CREATE CUSTOMER
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
                {customers && (
                    <DataGrid
                        rows={customers}
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

export default ViewCustomers;

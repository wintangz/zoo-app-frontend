import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHabitats } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import Actions from './actions';

function ViewHabitat() {
    const navigate = useNavigate();
    const userRole = decode(localStorage.getItem('token')).roles[0];
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note that months are zero-based
        const year = date.getFullYear();

        // Use template literals to format the date
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    const [habitats, setHabitats] = useState(null);
    const [remove, setRemove] = useState(null);
    useEffect(() => {
        try {
            const res = getHabitats();
            res.then((habitats) => {
                setHabitats(habitats);
            })
        } catch (error) {
            console.error(error);
        }
    }, [remove])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 60,
        },

        {
            field: 'name',
            headerName: 'name',
            headerAlign: 'left',
            align: 'left',
            width: 170,
        },

        {
            field: 'info',
            headerName: 'Infomation',
            headerAlign: 'left',
            align: 'left',
            width: 130,
        },

        {
            field: 'createdDate',
            headerName: 'createdDate',
            headerAlign: 'left',
            align: 'left',
            width: 130,
            valueFormatter: (params) => formatDate(params.value),
        },

        {
            field: 'imgUrl',
            headerName: 'Image',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.name} style={{ width: '90%', height: 'auto' }} />
            ),
        },
        {
            field: 'bannerUrl',
            headerName: 'Banner Image',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.bannerUrl} alt={params.row.name} style={{ width: '80%', height: 'auto' }} />
            ),
        },
        {
            field: 'status',
            headerName: 'status',
            headerAlign: 'left',
            width: 80,
        },
        userRole === 'STAFF' && {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 140,
            renderCell: (params) => <Actions params={params} setRemove={setRemove} />,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View Habitats" subtitle="Table of Habitats" />
            {userRole === 'STAFF' && (
                <Box display="flex" justifyContent="left">
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={() => navigate('/home/habitats/create')}
                    >
                        CREATE HABITAT
                    </Button>
                </Box>
            )}

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
                {habitats && (
                    <DataGrid
                        rows={habitats}
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

export default ViewHabitat;
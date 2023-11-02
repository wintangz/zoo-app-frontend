import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnclosures } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';
import Actions from './actions';

function ViewEnclosure() {
    const navigate = useNavigate()
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note that months are zero-based
        const year = date.getFullYear();

        // Use template literals to format the date
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    const userRole = decode(localStorage.getItem('token')).roles[0];

    const [enclosures, setEnclosures] = useState(null);
    const [remove, setRemove] = useState(null);

    useEffect(() => {
        try {
            const res = getEnclosures();
            res.then((enclosures) => {
                setEnclosures(enclosures);
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
        },

        {
            field: 'info',
            headerName: 'Infomation',
            headerAlign: 'left',
            align: 'left',
            width: 150,
        },

        {
            field: 'maxCapacity',
            headerName: 'Max Capacity',
            headerAlign: 'left',
            width: 80,
        },

        {
            field: 'createdDate',
            headerName: 'createdDate',
            headerAlign: 'left',
            align: 'left',
            width: 140,
            valueFormatter: (params) => formatDate(params.value),
        },
        {
            field: 'habitat',
            headerName: 'Habitat',
            headerAlign: 'left',
            align: 'left',
            width: 120,
            renderCell: (params) => (
                <span>{params.row.habitat.name}</span>
            ),

        },

        {
            field: 'imgUrl',
            headerName: 'Image',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.name} style={{ width: '80%', height: 'auto' }} />
                // <div style={{ background: `url(${params.row.imgUrl}) no-repeat`, backgroundSize: 'cover', width: '80%', height: '500%' }}></div>
            ),
        },
        {
            field: 'status',
            headerName: 'status',
            headerAlign: 'left',
            width: 80,
        },
        userRole === 'STAFF' &&
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 140,
            renderCell: (params) => <Actions params={params} setRemove={setRemove} />,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View Enclosures" subtitle="Table of Enclosures" />
            {userRole === 'STAFF' && (
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/enclosures/create')}
                >
                    Create Enclosure
                </Button>
            )}
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
                {enclosures && (
                    <DataGrid
                        rows={enclosures}
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

export default ViewEnclosure;
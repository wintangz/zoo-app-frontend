import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { tokens } from '~/theme';
// import Actions from './actions.jsx';
import { getTickets } from '~/api/ticketService.js';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
function ViewTicket() {
    const [ticket, setTicket] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const getTicketInfo = async () => {
            const res = getTickets();
            res.then((result) => {
                setTicket(result);
            });
        };
        getTicketInfo();
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'imgUrl',
            headerName: 'Image',
            headerAlign: 'center',
            align: 'left',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.name} style={{ width: '75%', height: 'auto' }} />
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'description', // Keep the field as 'firstname'
            headerName: 'Description',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },

        {
            field: 'price',
            headerName: 'Price',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'left',
            align: 'left',
        },

        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     type: 'actions',
        //     width: 80,
        //     renderCell: (params) => <Actions {...{ params }} />,
        // },
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
                {ticket && (
                    <DataGrid
                        rows={ticket}
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

export default ViewTicket;

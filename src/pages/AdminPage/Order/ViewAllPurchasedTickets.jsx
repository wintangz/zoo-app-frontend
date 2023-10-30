import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getOrdersTickets } from '~/api/orderService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

function ViewOrdersTickets() {
    const [ordersTicketsResult, setOrdersTicketsResult] = useState(null);
    const fetchApi = async () => {
        const resultTitle = await getOrdersTickets();
        console.log(resultTitle);
        setOrdersTicketsResult(resultTitle);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.2,
            valueGetter: (params) => `${params.row.id}`
        },
        {
            field: 'ticket',
            headerName: 'Ticket',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            valueGetter: (params) => `${params.row.ticket?.name}`
        },
        {
            field: 'order',
            headerName: 'Customer',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            valueGetter: (params) => `${params.row.order.customer.username}`,
        },
        {
            field: 'checkedBy',
            headerName: 'Checked By',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
            valueGetter: (params) => `${params.row.checkedBy?.username}`,
        },
        {
            field: 'checked',
            headerName: 'Checked',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View Purchased Tickets" subtitle="Show All Purchased Tickets" />
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
                {ordersTicketsResult && (
                    <DataGrid
                        rows={ordersTicketsResult}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                    // checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
}

export default ViewOrdersTickets;

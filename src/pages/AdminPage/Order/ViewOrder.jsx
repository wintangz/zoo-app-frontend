import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getOrders } from '~/api/orderService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';

function ViewOrders() {
    const [ordersResult, setOrdersResult] = useState(null);
    const fetchApi = async () => {
        const resultTitle = await getOrders();
        console.log(resultTitle);
        setOrdersResult(resultTitle);
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
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'customer',
            headerName: 'Customer',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            valueGetter: (params) => `${params.row.customer.username}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
        },
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View Orders" subtitle="Show All Orders" />
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
                {ordersResult && (
                    <DataGrid
                        rows={ordersResult}
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

export default ViewOrders;

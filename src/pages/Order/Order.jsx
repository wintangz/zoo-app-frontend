import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getOrderByCusId, getOrderById } from "~/api/orderService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from "~/theme";
import { decode } from "~/utils/axiosClient";
import Actions from "./actions";

function Order() {
    const [orders, setOrders] = useState();
    const id = decode(localStorage.getItem('token')).sub;
    useEffect(() => {
        const res = getOrderByCusId(id)
        res.then(result => {
            setOrders(result)
        })
    }, [])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: '20'
        },

        {
            field: 'createdDate',
            headerName: 'Date',
            headerAlign: 'center',
            align: 'left',
            width: '200'
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            headerAlign: 'left',
            align: 'left',
            width: '120'
        },

        {
            field: 'total',
            headerName: 'Total Amount',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'status',
            headerName: 'Payment Status',
            headerAlign: 'left',
            align: 'left',
            width: '180'
        },
        {
            field: 'actions',
            headerName: 'View Details',
            type: 'actions',
            width: 100,
            renderCell: (params) => <Actions {...{ params }} />,
        },
    ];
    return (
        <Box m="20px" display='flex' sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <AdminHeader title="View all Orders" />
            <Box

                m="40px 0 0 0"
                width='70vw'
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
                {orders && (
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        getRowId={(row) => row.id}
                    />
                )}
            </Box>
        </Box>
    );;
}

export default Order;
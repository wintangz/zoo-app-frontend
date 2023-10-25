import DetailsIcon from '@mui/icons-material/Details';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { getOrderDetailByOderId } from '~/api/orderService';
import { tokens } from '~/theme';

const Actions = ({ params, setRemove }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const style = {
        position: 'absolute',
        top: '80%',
        left: '70%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minHeight: 800,
        bgcolor: colors.blueAccent[600],
        color: colors.grey[100],
        boxShadow: 24,
        padding: 0
    };
    const [detail, setDetail] = useState()
    const handleDetails = (values) => {
        console.log(values);
        const res = getOrderDetailByOderId(values.id)
        res.then(result => {
            console.log(result);
            setDetail(result);
        })
        setOpen(true)
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: '20'
        },
        {
            field: 'name',
            headerName: 'Name',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.ticket.name },
            width: '100'
        },
        {
            field: 'description',
            headerName: 'Description',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.ticket.description },
            width: '120'
        },

        {
            field: 'price',
            headerName: 'Price',
            headerAlign: 'left',
            valueGetter: (params) => { return params.row.ticket.price },
            align: 'left',
        },

        {
            field: 'orderStatus',
            headerName: 'Payment Status',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.ticket.status },
            width: '100'
        },
        {
            field: 'isChecked',
            headerName: 'Checked',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.checked },
            width: '100'
        },
        {
            field: 'checkBy',
            headerName: 'Check By',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.checkedBy ? params.row.checkedBy : "Not yet" },
            width: '100'
        },
    ];


    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    BackdropProps={{
                        invisible: true,
                    }}
                >
                    <>
                        <Box sx={{ ...style }}>
                            <h2 style={{ color: 'white', display: 'flex', justifyContent: 'center' }} id="parent-modal-title">View Order Detail</h2>
                            <Box >
                                <Box
                                    width='50vw'
                                    height="67vh"
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
                                    {detail && (
                                        <DataGrid
                                            rows={detail}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </>
                </Modal>
            </div>
            <Tooltip title="View Detail">
                <IconButton
                    onClick={() => {
                        handleDetails(params.row)

                    }}
                >
                    <DetailsIcon />
                </IconButton  >
            </Tooltip>

        </>
    );
};
export default Actions;

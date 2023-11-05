import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as dietService from '~/api/dietService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './DeleteDiet';
// import Actions from './DeleteFoods';

function ViewDiet() {
    const navigate = useNavigate();
    const [remove, setRemove] = useState(null);
    const [dietResult, setDietResult] = useState(null);
    const fetchApi = async () => {
        const result = await dietService.getDiet();
        console.log(result);
        setDietResult(result);
    };

    useEffect(() => {
        fetchApi();
    }, [remove]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'creator',
            headerName: 'Creator',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
            valueGetter: (params) => `${params.row.creator.username}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
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
            <AdminHeader title="View Diets" subtitle="Table of Diets" />
            <Box display="flex" justifyContent="left">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/diets/create')}
                >
                    CREATE DIET
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
                {dietResult && (
                    <DataGrid
                        rows={dietResult}
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

export default ViewDiet;

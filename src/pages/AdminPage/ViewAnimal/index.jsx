import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getAllAnimals } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './actions';

function ViewAnimals() {
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note that months are zero-based
        const year = date.getFullYear();

        // Use template literals to format the date
        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    const [animals, setAnimals] = useState(null);
    const [remove, setRemove] = useState(null);
    useEffect(() => {
        try {
            const res = getAllAnimals();
            res.then((animals) => {
                setAnimals(animals);
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
            field: 'arrivalDate',
            headerName: 'arrivalDate    ',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'dateOfBirth', // Keep the field as 'firstname'
            headerName: 'dateOfBirth',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },

        {
            field: 'name',
            headerName: 'name',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'origin',
            headerName: 'origin',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'sex',
            headerName: 'sex',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'size',
            headerName: 'size',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'species',
            headerName: 'species',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'status',
            headerName: 'status',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'weight',
            headerName: 'weight',
            headerAlign: 'left',
            width: 80,
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
            <AdminHeader title="View all animals" subtitle="Table of Animals" />
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
                {animals && (
                    <DataGrid
                        rows={animals}
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

export default ViewAnimals;
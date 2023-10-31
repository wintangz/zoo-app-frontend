import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpecies } from '~/api/speciesService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './DeleteSpecies';
// import Actions from './DeleteFoods';

function ViewSpecies() {
    const navigate = useNavigate();
    const [remove, setRemove] = useState(null);
    const [speciesResult, setSpeciesResult] = useState(null);
    const fetchApi = async () => {
        const result = await getSpecies();
        setSpeciesResult(result);
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
            field: 'name',
            headerName: 'Name',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'species',
            headerName: 'Species',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'genus',
            headerName: 'Genus',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'family',
            headerName: 'Family',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'habitat',
            headerName: 'Habitat',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            valueGetter: (params) => `${params.row.habitat.name}`,
        },
        {
            field: 'diet',
            headerName: 'Diet',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'conversationStatus',
            headerName: 'Conversation Status',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'imgUrl',
            headerName: 'ImgUrl',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (<div style={{ background: `url(${params.row.imgUrl}) no-repeat`, backgroundSize: 'cover', width: '100%', height: '100%' }}></div>)
        },
        {
            field: 'avatarUrl',
            headerName: 'AvatarUrl',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (<div style={{ background: `url(${params.row.avatarUrl}) no-repeat`, backgroundSize: 'cover', width: '100%', height: '100%' }}></div>)
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
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
            <AdminHeader title="View Species" subtitle="Show All Species" />
            <Box display="flex" justifyContent="left">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/species/create')}
                >
                    CREATE SPECIES
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
                {speciesResult && (
                    <DataGrid
                        rows={speciesResult}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 15 } },
                        }}

                        // checkboxSelection
                        pageSizeOptions={[15, 30, 50]}
                        disableRowSelectionOnClick
                    />
                )}
            </Box>
        </Box>
    );
}

export default ViewSpecies;

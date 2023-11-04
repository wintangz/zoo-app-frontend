import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as newsService from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './DeleteNews';

function ViewNews() {
    const navigate = useNavigate();
    const [remove, setRemove] = useState(null);
    const [newsResult, setNewsResult] = useState(null);
    const fetchApi = async () => {
        const resultTitle = await newsService.getNews();
        console.log(resultTitle);
        setNewsResult(resultTitle);
    };

    useEffect(() => {
        fetchApi();
    }, [remove]);
    const handleRowDoubleClick = (params) => {
        const homeNewsId = params.row.id;
        navigate(`/home/news/${homeNewsId}`);
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'title',
            headerName: 'Title',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'content',
            headerName: 'Content',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
        },
        {
            field: 'author',
            headerName: 'Author',
            headerAlign: 'left',
            align: 'left',
            flex: 0.5,
            valueGetter: (params) => `${params.row.authorLastname} ${params.row.authorFirstname}`,
        },
        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'left',
            align: 'left',
            flex: 0.3,
        },
        {
            field: 'imgUrl',
            headerName: 'ImgUrl',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'thumbnailUrl',
            headerName: 'ThumbnailUrl',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            align: 'left',
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
            <AdminHeader title="View News" subtitle="Table of News" />
            <Box display="flex" justifyContent="left">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/news/create')}
                >
                    CREATE NEWS
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
                {newsResult && (
                    <DataGrid
                        rows={newsResult}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        onRowDoubleClick={handleRowDoubleClick}
                    />
                )}
            </Box>
        </Box>
    );
}

export default ViewNews;

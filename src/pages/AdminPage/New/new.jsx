import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import * as newsService from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { tokens } from '~/theme';

function ViewNews() {
    const [newsResult, setNewsResult] = useState(null);
    const fetchApi = async () => {
        const resultTitle = await newsService.getNews();

        setNewsResult(resultTitle);
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
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View New" subtitle="" />
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
                {newsResult && (
                    <DataGrid
                        rows={newsResult}
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

export default ViewNews;

import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnclosuresAnimals } from "~/api/animalsService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from "~/theme";
import { formatDate } from "~/utils/dateTimeFormat";

function History() {
    const navigate = useNavigate()
    const location = useLocation()
    const [enclosures, setEnclosures] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getEnclosuresAnimals();
            const allEnclosures = res.filter(enclosure => enclosure.animal.id === location.state.id);
            setEnclosures(allEnclosures);
        };
        fetchData();
    }, [location.state.id]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'name',
            headerName: 'Animal Name',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => { return params.row.animal.name }
        },
        {
            field: 'enclosureName',
            headerName: 'Enclosure Name',
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => {
                return params.row.animal.enclosures.map(enclosure => {
                    return `${enclosure.name} - ${enclosure.info}`;
                })
            }
        },
        {
            field: 'moveinDate',
            headerName: 'Move in Date',
            headerAlign: 'left',
            width: "120",
            align: 'left',
            valueGetter: (params) => { return params.row.moveInDate ? formatDate(params.row.moveInDate) : "Not Yet" }
        },
        {
            field: 'moveOutDate', // Keep the field as 'firstname'
            headerName: 'Move out Date',
            headerAlign: 'left',
            width: "120",
            margin: "0 !important",
            valueGetter: (params) => { return params.row.moveOutDate ? formatDate(params.row.moveOutDate) : "Not Yet" }
        },




    ];
    return (
        <>
            <Box m="20px">
                <AdminHeader title="History Enclosure" subtitle="Table of Animals History Enclosure" />
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/animals')}
                >
                    View All Animal
                </Button>
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
                    {enclosures && (
                        <DataGrid
                            rows={enclosures}
                            columns={columns}
                            getRowId={(row) => row.id}
                            components={{ Toolbar: GridToolbar }}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}

export default History;
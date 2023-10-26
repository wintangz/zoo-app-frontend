import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHealthCare } from "~/api/healService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from "~/theme";
import Actions from "./actions";

function ViewHealth() {
    const [healthCare, setHealthCare] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const res = getHealthCare()
        res.then((result) => {
            setHealthCare(result)
        })
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'animal',
            headerName: 'Animal',
            headerAlign: 'center',
            align: 'left',
            valueGetter: (params) => { return `${params.row.animal.id} - ${params.row.animal.name}` }
        },
        {
            field: 'diagnosis',
            headerName: 'Diagnosis',
            headerAlign: 'center',
            align: 'left',

        },
        {
            field: 'height',
            headerName: 'Height    ',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'imgUrl',
            headerName: 'imgUrl',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.lifeStage} style={{ width: '75%', height: 'auto' }} />
            ),
        },

        {
            field: 'length',
            headerName: 'Length',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'lifeStage',
            headerName: 'LifeStage',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'recordedDateTime',
            headerName: 'Recorded Date Time',
            headerAlign: 'left',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 80,
            renderCell: (params) => <Actions {...{ params }} />,
            flex: 1,
        },
    ];
    return (
        <>
            <Box m="20px">

                <AdminHeader title="Health Care Animals" />
                <Box display="flex" justifyContent="left">
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={() => navigate('/home/health/create')}
                    >
                        Create HealthCare
                    </Button>
                </Box>
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
                    {healthCare && <DataGrid
                        rows={healthCare}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />}
                </Box>
            </Box>
        </>
    );
}

export default ViewHealth;
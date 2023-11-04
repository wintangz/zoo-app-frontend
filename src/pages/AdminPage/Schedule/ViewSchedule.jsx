import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSchedule } from "~/api/animalsService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from '~/theme';
import Actions from "./actions";
import { decode } from '~/utils/axiosClient';
import { formatDateTime } from '~/utils/dateTimeFormat';

function ViewSchedule() {
    const userId = Number.parseInt(decode(localStorage.getItem('token')).sub)
    const userRole = decode(localStorage.getItem('token')).roles[0]
    console.log(userRole)
    const [remove, setRemove] = useState()
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({})
    useEffect(() => {
        const res = getAllSchedule();
        res.then((result) => {
            const filter = result.filter(schedule => {
                return schedule.zooTrainerId === userId
            });
            if (userRole === "ZOO_TRAINER") {
                setSchedule(filter)
            } else if (userRole === "STAFF") {
                setSchedule(result)
            }
        })
    }, [remove])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: "30"
        },
        {
            field: 'animalId',
            headerName: 'Animal ID',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'dietId',
            headerName: 'Diet ID',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'img',
            headerName: 'Image',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            height: 100,
            // valueGetter: (params) => { console.log(params.row) },
            renderCell: (params) => (<div style={{ background: `url("${params.row.confirmationImgUrl}") no-repeat`, backgroundSize: "cover", height: "100px", width: "100px" }}></div>)
        },
        {
            field: 'fed', // Keep the field as 'firstname'
            headerName: 'Is fed',
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => { return params.row.fed ? "Đã cho ăn" : "Not yet"; },
        },
        {
            field: 'feederId',
            headerName: 'Feeder ID',
            headerAlign: 'center',
            align: 'center',
        },

        {
            field: 'feedingTime',
            headerName: 'Feeding Time',
            headerAlign: 'center',
            width: '135',
            align: 'center',
            valueGetter: (params) => { return formatDateTime(new Date(params.row.feedingTime)) }
        },

        {
            field: 'zooTrainerId',
            headerName: 'Created by',
            headerAlign: 'center',
            align: 'center',
            width: 80,
        },

        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 120,
            renderCell: (params) => <>{!params.row.fed && <Actions {...{ params }} setRemove={setRemove} />}</>,
        }
    ];
    return (
        <Box m="20px">
            <AdminHeader title="View Schedules" subtitle="Table of Schedules" />
            <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => navigate('/home/animals/feed')}
            >
                Create Schedule
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
                {schedule && (
                    <DataGrid
                        rows={schedule}
                        columns={columns}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        checkboxSelection
                        rowHeight={100}
                    />
                )}
            </Box>
        </Box>
    );
}

export default ViewSchedule;
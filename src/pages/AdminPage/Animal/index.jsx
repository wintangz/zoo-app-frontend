import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAnimals, getEnclosuresAnimals } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './actions';
import DateTimeFormatComponent, { formatDate } from '~/utils/dateTimeFormat';
import { decode } from '~/utils/axiosClient';

function ViewAnimals() {
    const navigate = useNavigate()
    const currentId = Number.parseInt(decode(localStorage.getItem('token')).sub);
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const [accept, setAccept] = useState(false)
    const [animals, setAnimals] = useState(null);
    const [remove, setRemove] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            const res = getAllAnimals();
            const response = getEnclosuresAnimals();

            Promise.all([res, response]).then(([animals, enclosures]) => {
                animals.map(animal => {
                    for (var i = 0; i < enclosures.length; i++) {
                        if (animal.id === enclosures[i].animal.id) {
                            if (enclosures[i].moveOutDate === null) {
                                animal.enclosure = enclosures[i];
                                break;
                            }
                        } else {
                            animal.enclosure = null
                        }
                    }
                })
                const animalsFilter = animals.filter(animal => {
                    const trainer = animal.trainers.filter(trainer => {
                        return trainer.id === currentId
                    })
                    return trainer.length !== 0
                })
                setAccept(animalsFilter)
                setAnimals(animals)
                // if (userRole === "ZOO_TRAINER") {
                //     setAnimals(animalsFilter);
                // } else {
                //     setAnimals(animals)
                // }
                setOpen(true);
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
            width: '30'
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
            headerName: 'Arrival Date    ',
            headerAlign: 'left',
            width: "120",
            align: 'left',
            valueGetter: (params) => { return formatDate(params.row.arrivalDate) }
        },
        {
            field: 'dateOfBirth', // Keep the field as 'firstname'
            headerName: 'Date Of Birth',
            headerAlign: 'left',
            width: "120",
            margin: "0 !important",
            valueGetter: (params) => { return formatDate(params.row.dateOfBirth) }
        },

        {
            field: 'name',
            headerName: 'Name',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'origin',
            headerName: 'Origin',
            headerAlign: 'left',
            align: 'left',
        },

        {
            field: 'sex',
            headerName: 'Sex',
            headerAlign: 'left',
            width: 80,
        },

        {
            field: 'species',
            headerName: 'Species',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            width: 80,
        },
        {
            field: 'currentEnlosures',
            headerName: 'Current Enlosures',
            headerAlign: 'left',
            valueGetter: (params) => { return params.row.enclosure ? params.row.enclosure.enclosure.name : "Not yet" },
            width: 120,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            float: 'left',
            renderCell: (params) => animals && (<Actions {...{ params }} setRemove={setRemove} accept={accept} />),
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <AdminHeader title="View all animals" subtitle="Table of Animals" />
            {userRole === 'ZOO_TRAINER' && (
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/animals/create')}
                >
                    Create Animal
                </Button>
            )}
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
                {open && <DataGrid
                    rows={animals && animals}
                    columns={animals && columns}
                    getRowId={(row) => row.id}
                    components={{ Toolbar: GridToolbar }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />}
            </Box>
        </Box>
    );
}

export default ViewAnimals;
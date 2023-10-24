import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAnimals, getEnclosuresAnimals } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import Actions from './actions';

function ViewAnimals() {
    const navigate = useNavigate()
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
    // useEffect(() => {
    //     try {
    //         const enclouses = getEnclosuresAnimals()
    //         console.log(enclouses)
    //         const res = getAllAnimals();
    //         res.then((animals) => {
    //             animals.map(animal => {
    //                 enclouses.then(result => {
    //                     result.map(enclouse => {
    //                         console.log(enclouse)
    //                         if (animal.id === enclouse.animal.id) {
    //                             console.log(animal.id)
    //                             animal.enclouse = enclouse.enclosure
    //                         } else {
    //                             animal.enclouse = null
    //                         }
    //                     })
    //                 })
    //             })
    //             setAnimals(animals);
    //             console.log('setAnimals')
    //         })

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [remove])
    useEffect(() => {
        try {
            const updateAnimalsWithEnclosures = async () => {
                const enclouses = await getEnclosuresAnimals();
                const animals = await getAllAnimals();

                const updatedAnimals = animals.map(animal => {
                    const matchingEnclosure = enclouses.find(enclouse => animal.id === enclouse.animal.id);

                    if (matchingEnclosure) {
                        animal.enclouse = matchingEnclosure.enclosure;
                    } else {
                        animal.enclouse = null;
                    }

                    return animal;
                });

                setAnimals(updatedAnimals);
            };

            updateAnimalsWithEnclosures();
        } catch (error) {
            console.error(error);
        }
    }, [remove]);
    console.log(animals);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: '20'
        },
        {
            field: 'imgUrl',
            headerName: 'Image',
            headerAlign: 'center',
            align: 'left',
            renderCell: (params) => (
                <img src={params.row.imgUrl} alt={params.row.name} style={{ width: '75%', height: 'auto' }} />
            ),
        },
        {
            field: 'arrivalDate',
            headerName: 'Arrival Date    ',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'dateOfBirth', // Keep the field as 'firstname'
            headerName: 'Date of Birth',
            headerAlign: 'left',
            align: 'left',
            width: '100'
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
            width: 40,
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'left',
            width: 40,
        },
        {
            field: 'enclouse',
            headerName: 'Current Enclosures',
            headerAlign: 'left',
            width: 120,
            valueGetter: (params) => { return params.row.enclouse ? params.row.enclouse.name : "Not yet" },
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
            <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => navigate('/home/animal/create')}
            >
                Create Animal
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
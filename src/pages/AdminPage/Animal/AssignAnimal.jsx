import { Autocomplete, Box, Button, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { assignZooTrainerToAnimal } from "~/api/animalsService";
import { getZooTrainer } from "~/api/userService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from '~/theme';
import { decode } from "~/utils/axiosClient";
function AssignAnimal(props) {
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const location = useLocation()
    const [trainers, setTrainers] = useState(null);
    const [currentTrainer, setCurrentTrainer] = useState(null);
    useEffect(() => {
        const res = getZooTrainer();
        res.then((result) => {
            setTrainers(result);
        })
    }, [])
    const handleSubmit = () => {
        const values = {
            animal_id: location.state.id,
            assigned_by: parseInt(decode(localStorage.getItem('token')).sub),
            trainer_id: currentTrainer.id,
        }
        const path = `animals/${location.state.id}/zoo-trainers/${currentTrainer.id}`;
        console.log(path);
        const res = assignZooTrainerToAnimal(values, path);
        res.then((result) => {
            if (result.status === "Ok") {

            }
        })
    }
    return (
        <>
            <Box>
                <AdminHeader title="ASSIGN ANIMAL" subtitle="Assign animal to zoo trainer" />
            </Box>
            <Box display="flex" sx={{ justifyContent: 'space-around' }} >
                <Box sx={{ width: "45%" }}>
                    <Box
                        display="flex"
                        gap="30px"
                        sx={{
                            flexDirection: 'column',
                        }}>
                        <Typography variant="h4" color={colors.grey[200]} sx={{ width: '100%' }}>
                            Animal Infomation
                        </Typography>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Animal ID"
                            value={location.state.id}
                            name="animal_id"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Animal Name"
                            value={location.state.name}
                            name="name"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Origin"
                            value={location.state.origin}
                            name="origin"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Species"
                            value={location.state.species}
                            name="species"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Date of Birth"
                            value={location.state.dateOfBirth}
                            name="dayofbirth"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Gender"
                            value={location.state.sex ? 'male' : 'female'}
                            name="gender"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                        <Autocomplete
                            multiple
                            id="Assigned"
                            options={location.state.assignors.map(assigned => assigned.lastname + " " + assigned.firstname)}
                            defaultValue={location.state.assignors.map(assigned => assigned.lastname + " " + assigned.firstname)}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} label="Assigned to" variant="filled" />
                            )}
                        />
                    </Box>
                </Box>





                <Box sx={{ width: "45%" }}>
                    <Box
                        display="flex"
                        gap="30px"
                        sx={{
                            flexDirection: 'column',
                        }}>
                        <Typography variant="h4" color={colors.grey[200]} sx={{ width: '100%' }}>
                            Zoo Trainer Infomation
                        </Typography>

                        <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Zoo Trainer Name"
                            name="name"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        >
                            {trainers &&
                                (trainers.map((trainer) => (
                                    <MenuItem key={trainer.id} value={`${trainer.lastname} ${trainer.firstname}`} onClick={() => {
                                        setCurrentTrainer(trainer);
                                    }} >
                                        {`${trainer.lastname} ${trainer.firstname}`}
                                    </MenuItem>
                                )))
                            }
                        </TextField>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Trainer ID"
                            value={currentTrainer && currentTrainer.id}
                            name="trainer_id"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Date of Birth"
                            value={currentTrainer && currentTrainer.dateOfBirth}
                            name="dateOfBirth"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Email"
                            value={currentTrainer && currentTrainer.email}
                            name="email"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Phone"
                            value={currentTrainer && currentTrainer.phone}
                            name="phone"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Gender"
                            value={currentTrainer && currentTrainer.sex ? 'male' : 'female'}
                            name="gender"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                    </Box>

                </Box>
            </Box>
            <Button type="submit" color="secondary" variant="contained" sx={{ float: "right", margin: "20px 30px 0 20px" }} onClick={handleSubmit}>
                EDIT ACCOUNT
            </Button>
        </>
    );
}

export default AssignAnimal;
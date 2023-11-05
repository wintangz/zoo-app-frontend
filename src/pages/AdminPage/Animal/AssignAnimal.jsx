import { Autocomplete, Box, Button, MenuItem, Modal, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assignZooTrainerToAnimal } from "~/api/animalsService";
import { getZooTrainer } from "~/api/userService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { tokens } from '~/theme';
import { decode } from "~/utils/axiosClient";
function AssignAnimal(props) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const location = useLocation()
    const [trainers, setTrainers] = useState(null);
    const [currentTrainer, setCurrentTrainer] = useState(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.grey[500],
        border: '2px solid #000',
        color: colors.grey[100],
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    useEffect(() => {
        const res = getZooTrainer();
        res.then((result) => {

            const filteredTrainers = result.filter((trainer) => {
                return !location.state.trainers.some((existingTrainer) => existingTrainer.id === trainer.id);
            });
            setTrainers(filteredTrainers);
        })
    }, [])
    const handleSubmit = () => {
        const values = {
            animal_id: location.state.id,
            assigned_by: parseInt(decode(localStorage.getItem('token')).sub),
            trainer_id: currentTrainer.id,
        }
        const path = `animals/${location.state.id}/zoo-trainers/${currentTrainer.id}`;
        console.log(values)
        const res = assignZooTrainerToAnimal(values, path);
        console.log(res);
        res.then((response) => {
            if (response.status === 200) {
                setOpen(true);
            }

        })
    }
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Assign animal Successfully!</h2>
                        <p id="parent-modal-description">Animal have been assign to {currentTrainer && currentTrainer.id} - {currentTrainer && currentTrainer.lastname} {currentTrainer && currentTrainer.firstname}  !</p>
                        <Button
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                            onClick={() => { navigate('/home/animals') }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Box m="28px">
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
                            options={location.state.trainers.map(trainer => {
                                return trainer.lastname + " " + trainer.firstname
                            })}
                            defaultValue={location.state.trainers.map(trainer => {
                                return trainer.lastname + " " + trainer.firstname;
                            })}
                            readOnly
                            renderInput={(params) => {
                                return (
                                    <TextField {...params} label="Assigned to" variant="filled" />
                                )
                            }}
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
            <Box display="flex" sx={{ justifyContent: "space-between" }}>
                <Button onClick={() => {
                    navigate("/home/animals")
                }} color="secondary" variant="contained" sx={{ float: "right", margin: "20px 30px 0 20px" }}>
                    VIEW ANIMALS
                </Button>
                <Button type="submit" color="secondary" variant="contained" sx={{ float: "right", margin: "20px 30px 0 20px" }} onClick={handleSubmit}>
                    ASSIGN
                </Button>

            </Box>
        </>
    );
}

export default AssignAnimal;
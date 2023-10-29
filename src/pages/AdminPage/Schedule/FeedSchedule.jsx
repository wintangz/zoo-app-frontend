import { Autocomplete, Box, Button, FormControl, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { tokens } from '~/theme';
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { useEffect, useState } from "react";
import { createFeedingSchedule, getAllAnimals, getAllDiet } from "~/api/animalsService";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import TimePicker from "react-time-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker from "react-multi-date-picker";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";

function FeedSchedule() {
    const navigate = useNavigate()
    const format = "MM/DD/YYYY HH:mm:ss";
    const [values, setValues] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentDiet, setCurrentDiet] = useState()
    const [diet, Setdiet] = useState(null);
    const [animals, setAnimals] = useState([]);
    const [currentAnimal, setCurrentAnimal] = useState();
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
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
        const res = getAllAnimals();
        res.then((result) => {
            setAnimals(result);
        })
        const dietRes = getAllDiet();
        dietRes.then((result) => {
            Setdiet(result);
        })
    }, [])
    const handleSubmit = () => {
        values.map((value, index) => {

            //convert timestamp to
            const parts = value.format().split(' ');
            const dateParts = parts[0].split('/');
            const timePart = parts[1];
            const formattedDateTime = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}T${timePart}`;

            const currentValue = {
                feedingTime: formattedDateTime,
                dietId: currentDiet.id,
                animalId: currentAnimal.id
            }
            const res = createFeedingSchedule(currentValue)
            res.then((result) => {
                console.log(result.status)
                if (result.status === 'Ok') {
                    setOpen(true);
                }
            })
        })
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Create Schedule Successfully!</h2>
                        <p id="parent-modal-description">New Schedule have been create!</p>
                        <Button onClick={() => {
                            setOpen(false);
                            navigate('/home/animals/schedule');
                        }}
                            sx={{ color: colors.grey[100] }}
                        >Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                <AdminHeader title="CREATE FEEDING SCHEDULE" />
            </Box>
            <Box display="flex" sx={{ justifyContent: 'space-around' }}>
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

                        {animals && <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Animal Name"
                            name="name"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        >
                            {animals && (animals.map((animal) => (
                                <MenuItem key={animal.id} value={animal.id} onClick={() => {
                                    setCurrentAnimal(animal);
                                }} >
                                    {animal.name}
                                </MenuItem>
                            )))}
                        </TextField>}
                        <TextField
                            variant="filled"
                            type="text"
                            label="Species"
                            value={currentAnimal && currentAnimal.species}
                            name="Species"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Gender"
                            value={currentAnimal && currentAnimal.species ? 'Male' : 'Female'}
                            name="gender"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                        <Autocomplete
                            multiple
                            id="Assigned"
                            options={(currentAnimal?.assignors || []).map(assigned => assigned.lastname + " " + assigned.firstname)}
                            value={(currentAnimal?.assignors || []).map(assigned => assigned.lastname + " " + assigned.firstname)}
                            readOnly
                            renderInput={(params) => (
                                <TextField {...params} label="Assigned to" variant="filled" />
                            )}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="DateOfBirth"
                            value={currentAnimal && currentAnimal.dateOfBirth}
                            name="dateOfBirth"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />


                    </Box>
                </Box>
                <Box sx={{ width: "45%" }}>
                    <Typography variant="h4" color={colors.primary[200]} sx={{ width: '100%' }}>
                        Feeding Schedule for Animal
                    </Typography>
                    <FormControl style={{ width: '100%', paddingTop: '12px', paddingBottom: '32px' }}>
                        {(
                            <InputLabel htmlFor="date-picker" style={{ width: '100%' }}>
                            </InputLabel>
                        )}
                        <h8>Feeding time</h8>
                        <DatePicker
                            style={{ width: "100%", height: '45px', background: colors.primary[200], border: "none" }}
                            value={values}
                            onChange={setValues}
                            multiple
                            sort
                            format={format}
                            plugins={[
                                <TimePicker position="bottom" />,
                                <DatePanel markFocused />
                            ]}
                        />

                    </FormControl>
                    <Box
                        display="flex"
                        gap="30px"
                        sx={{
                            flexDirection: 'column',
                        }}>


                        {diet && <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Diet Type"
                            name="name"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        >
                            {diet && (diet.map((dietElemet) => (
                                <MenuItem value={dietElemet.id} onClick={() => {
                                    setCurrentDiet(dietElemet);
                                }} >
                                    {`${dietElemet.type} - ${dietElemet.foodList.map((foodList) => foodList.name).join(', ')}`}
                                </MenuItem>
                            )))}
                        </TextField>}
                        <TextField
                            variant="filled"
                            type="text"
                            label="Food List Name"
                            value={currentDiet && currentDiet.foodList.map((foodList) => foodList.name)}
                            name="foodListName"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Food List Type"
                            value={currentDiet && currentDiet.foodList.map((foodList) => foodList.type)}
                            name="foodListType"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit} sx={{ float: "right", marginRight: '20px' }} >
                CREATE SCHEDULE
            </Button>
        </>
    );
}

export default FeedSchedule;
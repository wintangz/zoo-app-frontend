import { Autocomplete, Box, Button, FormControl, InputLabel, Modal, TextField, Typography, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { tokens } from '~/theme';
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllAnimals, getAllDiet, updateSchedule } from "~/api/animalsService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatetimeDayjsformatted } from "~/utils/dateTimeFormat";

function UpdateSchedule() {
    const navigate = useNavigate();
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
    const location = useLocation()
    const format = "MM/DD/YYYY HH:mm:ss";
    const timeObject = new Date(location.state.feedingTime)

    const [defaultDiet, setDefaultDiet] = useState();
    const [values, setValues] = useState(
        dayjs(timeObject)
    );
    const [open, setOpen] = useState(false);
    const [currentDiet, setCurrentDiet] = useState()
    const [diet, Setdiet] = useState();
    const [animals, setAnimals] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState([])

    useEffect(() => {
        const res = getAllAnimals();
        res.then((result) => {
            result.map((animal) => {
                if (animal.id === location.state.animalId) {
                    setAnimals(animal);
                    setCurrentAnimal(animal);
                }
            })
        })
        const dietRes = getAllDiet();
        dietRes.then((result) => {
            const filter = result.filter(diet => {
                return diet.status === true;
            })
            Setdiet(filter);
            result.map((diet) => {
                if (diet.id === location.state.dietId) {
                    setCurrentDiet(diet);
                    setDefaultDiet(diet);
                }
            })
        })
        setCurrentDiet(defaultDiet)
    }, [])

    const handleSubmit = () => {
        const formattedDate = DatetimeDayjsformatted(values)
        const submitValues = {
            'feedingTime': formattedDate,
            'dietId': currentDiet.id,
            'animalId': currentAnimal.id
        }
        const res = updateSchedule(location.state.id, submitValues)
        res.then((result) => {
            if (result.status === 200) {
                setOpen(true);
            }
        })
    }
    return (<>
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    navigate('/home/animals/schedule');
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Update Schedule Successfully!</h2>
                    <p id="parent-modal-description">Schedule have been edit!</p>
                    <Button onClick={() => {
                        setOpen(false);
                        navigate('/home/animals/schedule');
                    }}
                        color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
                    >Close</Button>
                </Box>
            </Modal>
        </div>
        <Box m="30px">
            <AdminHeader title="Update Feeding Schedule" subtitle="Update feeding schedule" />
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
                        type="text"
                        variant="filled"
                        label="Animal Name"
                        name="name"
                        defaultValue=" "
                        value={currentAnimal.name}
                        sx={{
                            gridColumn: 'span 2',
                            width: '100%'
                        }}
                    />}

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
                        options={(currentAnimal?.trainers || []).map(assigned => assigned.lastname + " " + assigned.firstname)}
                        value={(currentAnimal?.trainers || []).map(assigned => assigned.lastname + " " + assigned.firstname)}
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
                <Typography variant="h4" color={colors.grey[100]} sx={{ width: '100%' }}>
                    Feeding Schedule for Animal
                </Typography>
                {/* <FormControl style={{ width: '100%', paddingTop: '12px', paddingBottom: '32px' }}>
                    {(
                        <InputLabel htmlFor="date-picker" style={{ width: '100%' }}>
                        </InputLabel>
                    )}
                    <h8>Feeding time</h8>
                    <DatePicker
                        style={{ width: "100%", height: '45px', background: colors.primary[200], border: "none" }}
                        values={values}
                        // onChange={setValues}
                        format={format}
                        plugins={[
                            <TimePicker position="bottom" />,   
                            <DatePanel markFocused />
                        ]}
                    />


                </FormControl> */}
                <FormControl style={{ width: '100%', paddingTop: '12px', paddingBottom: '32px' }}>
                    <h8>Feeding time</h8>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={dayjs(values)} onChange={setValues} />
                    </LocalizationProvider>
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
                        defaultValue={defaultDiet ? defaultDiet.id : ""}
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
        <Box display="flex" sx={{ justifyContent: "space-between", margin: '30px' }}>
            <Button onClick={() => navigate("/home/animals/schedule")} color="secondary" variant="contained" >
                VIEW SCHEDULE
            </Button>
            <Button onClick={handleSubmit} color="secondary" variant="contained"  >
                EDIT SCHEDULE
            </Button>
        </Box>
    </>);
}

export default UpdateSchedule;
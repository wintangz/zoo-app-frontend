import { Autocomplete, Box, Button, FormControl, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { tokens } from '~/theme';
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllAnimals, getAllDiet } from "~/api/animalsService";
import AdminHeader from "~/component/Layout/components/AdminHeader";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function UpdateSchedule() {
    const location = useLocation()
    const format = "MM/DD/YYYY HH:mm:ss";
    const timeObject = new Date(location.state.feedingTime)
    const defaulttime = new DateObject(timeObject)
    const [defaultDiet, setDefaultDiet] = useState();
    const [values, setValues] = useState([
        defaulttime.set({ format })
    ]);

    const [open, setOpen] = useState(false);
    const [currentDiet, setCurrentDiet] = useState()
    const [selectedRows, setSelectedRows] = useState([]);
    const [diet, Setdiet] = useState();
    const [animals, setAnimals] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState([])
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    console.log(location.state)

    useEffect(() => {
        const res = getAllAnimals();
        res.then((result) => {
            result.map((animal) => {
                if (animal.id === location.state.animalId) {
                    setAnimals(animal);
                    setCurrentAnimal(animal);
                    console.log(animal)
                }
            })
        })
        const dietRes = getAllDiet();
        dietRes.then((result) => {
            Setdiet(result);
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
        const parts = values.format().split(' ');
        const dateParts = parts[0].split('/');
        const timePart = parts[1];
        const formattedDateTime = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}T${timePart}`;


        const currentValue = {

        }
    }
    return (<>
        <Box>
            <AdminHeader title="EDIT FEEDING SCHEDULE" />
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
                        // value={values}
                        onChange={setValues}
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
        <Button type="submit" color="secondary" variant="contained" onClick={handleSubmit} sx={{ float: "right", marginRight: '20px' }} >
            CREATE SCHEDULE
        </Button>
    </>);
}

export default UpdateSchedule;
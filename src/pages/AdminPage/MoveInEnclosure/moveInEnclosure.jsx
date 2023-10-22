import { Autocomplete, Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import { tokens } from '~/theme';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getEnclosures, moveInEnclosure } from "~/api/animalsService";
import AdminHeader from "~/component/Layout/components/AdminHeader/AdminHeader";
import { withSuccess } from "antd/es/modal/confirm";

function MoveInEnclosure() {

    const [open, setOpen] = useState(false);
    const theme = useTheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const [enclosures, setEnclosures] = useState()
    const [currentEnclosure, setCurrentEnclosure] = useState()
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
        const res = getEnclosures();
        res.then(result => {
            setEnclosures(result);

        })
    }, [])
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        const animalId = location.state.id;
        const enclosureId = currentEnclosure.id;
        const res = moveInEnclosure(animalId, enclosureId);
        res.then(result => {
            console.log(result);
            if (result.status === "Ok") {
                setOpen(true);
            }
            else {
                document.getElementById("showError").innerHTML = result.data.serverError;
            }
        })
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
                        <h2 id="parent-modal-title">Move In animal successfully!</h2>
                        <p id="parent-modal-description">New animal have been add to Enclosure!</p>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                <AdminHeader title="Move In Enclosure" subtitle="Move In Animal to Enclosure" />
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
                            Enclosure Infomation
                        </Typography>

                        <TextField
                            fullWidth
                            variant="filled"
                            select
                            label="Enclosure Name"
                            name="name"
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        >
                            {enclosures && (enclosures.map((enclosure) => (
                                <MenuItem key={enclosure.id} value={enclosure.id} onClick={() => {
                                    setCurrentEnclosure(enclosure);
                                }} >
                                    {`${enclosure.info} - ${enclosure.name}`}
                                </MenuItem>
                            )))}
                        </TextField>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Habitat"
                            value={currentEnclosure && `${currentEnclosure.habitat.name} - ${currentEnclosure.habitat.info}`}
                            name="habitat"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Capacity"
                            value={currentEnclosure && currentEnclosure.maxCapacity}
                            name="capacity"
                            defaultValue=" "
                            sx={{
                                gridColumn: 'span 2',
                                width: '100%'
                            }}
                        />

                    </Box>
                    <div >
                        <h6 id="showError" style={{ float: "right", marginTop: "20px", color: "red" }}></h6>
                    </div>
                </Box>
            </Box>
            <Button type="submit" color="secondary" variant="contained" sx={{ float: "right", margin: "20px 30px 0 20px" }} onClick={handleSubmit}>
                Move in Enclosure
            </Button>
        </>
    );
}

export default MoveInEnclosure;
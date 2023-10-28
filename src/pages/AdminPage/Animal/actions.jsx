import { Delete, Edit } from '@mui/icons-material';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAnimals, moveOutEnclosure } from '~/api/animalsService';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

const Actions = ({ params, setRemove, accept }) => {
    const userRole = decode(localStorage.getItem('token')).roles[0];
    const userID = Number.parseInt(decode(localStorage.getItem('token')).sub);
    let navigate = useNavigate();
    const [message, setMessage] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [moveOut, setMoveOut] = useState(false);
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
    const handleDelete = (values) => {
        setOpen(false);
        deleteAnimals(values)
            .then((response) => {
                console.log(response);
                if (response.status === "Ok") {
                    console.log('DELETE request successful:', response);
                    setMessage(true);
                }
            })
            .catch((error) => {
                console.error('DELETE request failed:', error);
            });
    };
    const handleEdit = () => {
        navigate('')
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleMessage = (values) => {
        setMessage(false);
        setRemove(values);
    };
    const handleMoveout = (values) => {
        const res = moveOutEnclosure(values.id, values.enclosure.enclosure.id)
        res.then(result => {
            if (result.status === "Ok") {
                setMoveOut(true);
                setRemove(values);
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
                        <h2 id="parent-modal-title">Delete user</h2>
                        <p id="parent-modal-description">Are you sure want to delete this animal?</p>
                        <Button onClick={handleClose}>Close</Button>
                        <Button
                            sx={{ color: colors.grey[100] }}
                            onClick={() => {
                                handleDelete(params.row.id);
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={message}
                    onClose={() => handleMessage(params.row.id)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Delete User Successfully!</h2>
                        <p id="parent-modal-description">User have been delete from DataBase!</p>
                        <Button
                            onClick={() => {
                                handleMessage(params.row.id);
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </div>
            <div>
                <Modal
                    open={moveOut}
                    onClose={() => setMoveOut(false)}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">Move Out Successfully!</h2>
                        <p id="parent-modal-description">Animal have been moved out to Enclosure !</p>
                        <Button
                            sx={{ color: colors.grey[100] }}
                            onClick={() => { setMoveOut(false) }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            </div>
            <Box>
                {userRole === "ZOO_TRAINER" && params.row.trainers?.some(element => element.id === userID) && <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <Delete />
                    </IconButton  >
                </Tooltip>}
                {userRole === "ZOO_TRAINER" && params.row.trainers?.some(element => element.id === userID)
                    && <Tooltip title="Edit Animal">
                        <Link to="/home/animals/update" state={params.row}>
                            <IconButton
                            >
                                <Edit />
                            </IconButton  >
                        </Link>
                    </Tooltip>}




                {userRole === "ZOO_TRAINER" && params.row.trainers?.some(element => element.id === userID) && params.row.enclosure &&
                    <Tooltip title="Move out Enclosure">
                        <IconButton
                            onClick={() => handleMoveout(params.row)}
                        >
                            <ExitToAppIcon />
                        </IconButton  >
                    </Tooltip>}


                {userRole === "ZOO_TRAINER" && params.row.trainers?.some(element => element.id === userID) && !params.row.enclosure &&
                    <Tooltip title="Move in Enclosure">
                        <Link to="/home/enclosures/move_in" state={params.row}>
                            <IconButton
                            >
                                <AddHomeIcon />
                            </IconButton  >
                        </Link>
                    </Tooltip>}

                {userRole === "STAFF" && <Tooltip title="Assign trainer">
                    <Link to="/home/animals/assign" state={params.row}>
                        <IconButton
                        // onClick={handleEdit(params.row)}
                        >
                            <AssignmentIcon />
                        </IconButton  >
                    </Link>
                </Tooltip>}

                <Tooltip title="History Move">
                    <Link to="/home/animals/enclosures_history" state={params.row}>
                        <IconButton
                        >
                            <ManageSearchOutlinedIcon />
                        </IconButton  >
                    </Link>
                </Tooltip>
            </Box>
        </>
    );
};
export default Actions;

import { Box, IconButton, Tooltip, Typography, useTheme, Button } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Modal from '@mui/material/Modal';
import { tokens } from '~/theme';
import axios from 'axios';
import { useState } from 'react';
import { Link, Route, useNavigate } from 'react-router-dom';
import Update from '../UpdateStaff';

const Actions = ({ params, setRemove }) => {
    let navigate = useNavigate();
    const [message, setMessage] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
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
        const token = localStorage.getItem('token');
        // Define the URL and headers
        const url = `http://localhost:8080/api/animals/${values}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Send the DELETE request
        axios
            .delete(url, { headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log('DELETE request successful:', response);
                    setOpen(false);
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
    const userInfo = {
        // Add your user information here
        name: 'John Doe',
        // Other properties
    };
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
            <Box>
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            // handleDelete(params.row.id);
                            setOpen(true);
                        }}
                    >
                        <Delete />
                    </IconButton  >
                </Tooltip>




                <Tooltip title="Assign trainer">
                    <Link to="/animal/assign" state={params.row}>
                        <IconButton
                        // onClick={handleEdit(params.row)}
                        >
                            <AssignmentIcon />
                        </IconButton  >
                    </Link>
                </Tooltip>

            </Box>
        </>
    );
};
export default Actions;

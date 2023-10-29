import { Delete, Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSchedules } from '~/api/animalsService';
import { tokens } from '~/theme';
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
        setOpen(false);
        deleteSchedules(values)
            .then((response) => {
                if (response.status === "Ok") {
                    console.log('DELETE request successful:', response);
                    setMessage(true);
                }
            })
            .catch((error) => {
                console.error('DELETE request failed:', error);
            });
    };

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
                        <h2 id="parent-modal-title">Delete schedule</h2>
                        <p id="parent-modal-description">Are you sure want to delete this schedule?</p>
                        <Button onClick={handleClose} color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Close</Button>
                        <Button
                            onClick={() => {
                                handleDelete(params.row.id);
                            }}
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
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
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
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




                <Tooltip title="Update">
                    <Link to="/home/animals/schedule/update" state={params.row}>
                        <IconButton
                        // onClick={handleEdit(params.row)}
                        >
                            <Edit />
                        </IconButton  >
                    </Link>

                </Tooltip>

                <Tooltip title="Confirm">
                    <Link to="/home/animals/confirm" state={params.row}>
                        <IconButton
                        // onClick={handleEdit(params.row)}
                        >
                            <CheckIcon />
                        </IconButton  >
                    </Link>

                </Tooltip>
            </Box>
        </>
    );
};
export default Actions;

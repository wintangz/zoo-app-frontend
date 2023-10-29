import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser } from '~/api/userService';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

const Actions = ({ params, setRemove }) => {
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
        deleteUser(values)
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
    const userRole = decode(localStorage.getItem('token')).roles[0];

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
                        <p id="parent-modal-description">Are you sure want to delete this user?</p>
                        <Button onClick={handleClose} color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Close</Button>
                        <Button
                            onClick={() => {
                                handleDelete(params.row.id);
                            }}
                            sx={{ color: 'white', fontWeight: "bold" }}
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
                            color='secondary' style={{ fontSize: '0.9rem', fontWeight: 'bold' }}
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
                {userRole === 'ADMIN' && (
                    <Tooltip title="Edit">
                        <Link to={`/home/staff/update/${params.row.id}`}>
                            <IconButton
                                onClick={() => {

                                }}
                            >
                                <Edit />
                            </IconButton  >
                        </Link>

                    </Tooltip>
                )}
                {userRole === 'STAFF' && (
                    <Tooltip title="Edit">
                        <Link to={`/home/zootrainer/update/${params.row.id}`}>
                            <IconButton
                                onClick={() => {

                                }}
                            >
                                <Edit />
                            </IconButton  >
                        </Link>

                    </Tooltip>
                )}
            </Box>
        </>
    );
};
export default Actions;

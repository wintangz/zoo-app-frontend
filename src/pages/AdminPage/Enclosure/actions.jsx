import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '~/theme';
import { decode } from '~/utils/axiosClient';

const Actions = ({ params, setRemove }) => {
    let navigate = useNavigate();

    const userRole = decode(localStorage.getItem('token')).roles[0];
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
        const url = `https://zoo-by-valt.azurewebsites.net/api/enclosures/${values}`;
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

    const handleClose = () => {
        setOpen(false);
    };
    const handleMessage = (values) => {
        setMessage(false);
        setRemove(values);
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
                        <h2 id="parent-modal-title">Delete Enclosure</h2>
                        <p id="parent-modal-description">Are you sure want to delete this enclosure?</p>
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
                        <h2 id="parent-modal-title">Delete Enclosure Successfully!</h2>
                        <p id="parent-modal-description">Enclosure have been delete from DataBase!</p>
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

                <Tooltip title="Edit">
                    <Link to={`/enclosure/update/${params.row.id}`}>
                        <IconButton
                            onClick={() => {

                            }}
                        >
                            <Edit />
                        </IconButton  >
                    </Link>
                </Tooltip>


                {/* <Tooltip title="Add to Habitat">
                    <Link to="/enclosure/addtohabitat" state={params.row}>
                    <IconButton
                    onClick={handleEdit(params.row)}
                    >
                        <AddIcon />
                    </IconButton  >
                    </Link>
                </Tooltip> */}

            </Box>
        </>
    );
};
export default Actions;

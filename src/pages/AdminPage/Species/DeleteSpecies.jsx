import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Tooltip, useTheme } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSpecies } from '~/api/speciesService';
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
    console.log(open)
    const handleDelete = (speciesId) => {
        setOpen(false);
        deleteSpecies(speciesId)
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
                        <h2 id="parent-modal-title">Delete species</h2>
                        <p id="parent-modal-description">Are you sure want to delete this species?</p>
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
                        <h2 id="parent-modal-title">Delete Species Successfully!</h2>
                        <p id="parent-modal-description">Species have been delete from DataBase!</p>
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
                            setOpen(true);
                        }}
                    >
                        <Delete />
                    </IconButton  >
                </Tooltip>


                <Tooltip title="Edit">
                    <Link to={`/home/species/update/${params.row.id}`}>
                        <IconButton
                            onClick={() => {

                            }}
                        >
                            <Edit />
                        </IconButton  >
                    </Link>

                </Tooltip>
            </Box>
        </>
    );
};
export default Actions;

import { Delete, Edit } from '@mui/icons-material';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAnimals } from '~/api/animalsService';
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






    return (
        <>
            <Tooltip title="Update">
                <Link to="/home/animals/health/update" state={params.row}>
                    <IconButton
                    // onClick={handleEdit(params.row)}
                    >
                        <Edit />
                    </IconButton  >
                </Link>
            </Tooltip>
        </>
    );
};
export default Actions;

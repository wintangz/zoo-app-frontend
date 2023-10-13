import { Box, TextField, useTheme as uTheme, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import { Formik } from 'formik';
import * as yup from 'yup';
import { tokens } from '~/theme';
import * as mockData from '~/api/data/mockData';
import { useState } from 'react';
import Form from './update.jsx';
import { decode } from '~/utils/axiosClient.js';
function Update() {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [users, setUsers] = useState({});
    const [show, setShow] = useState(false);
    const theme = uTheme();
    const colors = tokens(theme.palette.mode);
    const handleClose = () => {
        setOpen(false);
    };
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
    const initialValues = {
        id: '',
    };
    const userSchema = yup.object().shape({
        id: yup.string().required('required'),
    });
    const fetchapi = async (id) => {
        const result = await mockData.getUserById(id);
        return result;
    };
    const handleFormSubmit = async (values) => {
        const newObj = decode(localStorage.getItem('token'));
        if (values.id === newObj.sub) {
            window.location = '/edit';
        } else {
            setId(values.id);
            setShow(true);
            const res = fetchapi(values.id);
            res.then((result) => {
                setUsers(result);
            });
        }
    };
    return (
        <>
            <Box>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h2 id="parent-modal-title">Update User Successfully!</h2>
                            <p id="parent-modal-description">User have been update to DataBase!</p>
                            <Button onClick={handleClose}>Close</Button>
                        </Box>
                    </Modal>
                </div>
                <AdminHeader title="UPDATE USER" subtitle="Enter all fields to update" />
                <Box m="20px">
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="block"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4,minmax(0,1fr))"
                                    sx={{
                                        '& > div': 'span 2',
                                    }}
                                >
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        label="User Id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.id}
                                        name="id"
                                        error={!!touched.id && !!errors.id}
                                        helperText={touched.id && errors.id}
                                        sx={{
                                            gridColumn: 'span 4',
                                            width: '50%',
                                        }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="start" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        GET USER INFO
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
            {show && <Form props={users} id={id} setShow={setShow} setOpen={setOpen} />}
        </>
    );
}

export default Update;

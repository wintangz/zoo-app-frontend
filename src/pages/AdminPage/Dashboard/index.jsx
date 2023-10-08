import { Box } from '@mui/material';
import AdminHeader from '~/component/Layout/components/AdminHeader';

function Dashboard() {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <AdminHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
        </Box>
    );
}

export default Dashboard;

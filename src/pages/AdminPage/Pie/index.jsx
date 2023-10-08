import { Box } from '@mui/material';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import PieChart from './pieChart';

const Pie = () => {
    return (
        <Box m="20px">
            <AdminHeader title="Pie Chart" subtitle="Simple Pie chart" />
            <Box height="75vh">
                <PieChart />
            </Box>
        </Box>
    );
};
export default Pie;

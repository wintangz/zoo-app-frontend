import { Box } from '@mui/material';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import LineChart from './lineChart';

const Line = () => {
    return (
        <Box m="20px">
            <AdminHeader title="Line Chart" subtitle="Simple Line chart" />
            <Box height="75vh">
                <LineChart />
            </Box>
        </Box>
    );
};
export default Line;

import { Box } from '@mui/material';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import BarChart from './barChart';

const Bar = () => {
    return (
        <Box m="20px">
            <AdminHeader title="Bar Chart" subtitle="Simple bar chart" />
            <Box height="75vh">
                <BarChart />
            </Box>
        </Box>
    );
};
export default Bar;

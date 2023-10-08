import { Box } from '@mui/material';
import AdminHeader from '~/component/Layout/components/AdminHeader';
import GeographyChart from './geographyChart';
import { tokens } from '~/theme';
import { useTheme as utheme } from '@mui/material';

const Geography = () => {
    const theme = utheme({ isDashboard: false });
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <AdminHeader title="Geography Chart" subtitle="Simple Geography chart" />
            <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
                <GeographyChart />
            </Box>
        </Box>
    );
};
export default Geography;

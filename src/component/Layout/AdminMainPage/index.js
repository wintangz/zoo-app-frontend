import { ColorModeContext, useMode } from '~/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import './index.css';

function AdminMainPage({ children }) {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="admin-container">
                    <Sidebar />
                    <main className="content ">
                        <Topbar />
                        <div>{children}</div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default AdminMainPage;

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '~/theme';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import './AdminMainPage.css';

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

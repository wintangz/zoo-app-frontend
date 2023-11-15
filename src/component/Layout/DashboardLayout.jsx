import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'
import { PrimeReactProvider } from 'primereact/api';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '~/theme';

const DashboardLayout = ({ children }) => {

    const [theme, colorMode] = useMode();

    return (
        <PrimeReactProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <div className="flex">
                        <Sidebar />
                        <main className="">
                            <Topbar />
                            <div>{children}</div>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </PrimeReactProvider>

    )
}

export default DashboardLayout
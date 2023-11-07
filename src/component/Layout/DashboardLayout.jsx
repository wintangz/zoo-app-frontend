import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Topbar from './components/Topbar/Topbar'
import { PrimeReactProvider } from 'primereact/api';

const DashboardLayout = ({ children }) => {
    return (
        <PrimeReactProvider>
            <div className="flex">
                <Sidebar />
                <main className="">
                    <Topbar />
                    <div>{children}</div>
                </main>
            </div>
        </PrimeReactProvider>

    )
}

export default DashboardLayout
import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';
import SidebarUser from '~/pages/Profile/SidebarUser/SidebarUser';
// Example CSS-in-JS with MUI's makeStyles

function ProfileUserLayout({ children }) {

    if (localStorage.getItem('token') === null) {
        window.location = '/'
    }
    const layoutStyles = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    };

    const contentStyles = {
        display: 'flex',
        flexGrow: 1,
        // marginTop: '68px', // Đặt marginTop là 100px cho cả content
    };

    const sidebarStyles = {
        // marginTop: '68px', // Đặt marginTop là 100px cho SidebarUser
        zIndex: -10000,
    };

    return (
        <div>
            <Header />
            <div style={{ display: "flex", marginTop: "68px", zIndex: "-100000" }}>
                <SidebarUser />
                <div className="-container">{children}</div>
            </div>

            <Footer />
        </div>

    );
}

export default ProfileUserLayout;

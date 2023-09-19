import Header from '~/component/Layout/components/Header';
import Sidebar from '~/component/Layout/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="container">{children}</div>
        </div>
    );
}

export default DefaultLayout;

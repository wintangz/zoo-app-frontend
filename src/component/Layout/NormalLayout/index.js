import Header from '~/component/Layout/components/Header';
import Footer from '~/component/Layout/components/Footer';
import NormalBanner from '~/component/Layout/components/NormalBanner';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <NormalBanner/>
            <div className="container">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

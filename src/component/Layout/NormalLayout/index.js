import Header from '~/component/Layout/components/Header';
import Footer from '~/component/Layout/components/Footer';
import NormalBanner from '~/component/Layout/components/NormalBanner';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;

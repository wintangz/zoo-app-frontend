import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {/* <NormalBanner /> */}
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;

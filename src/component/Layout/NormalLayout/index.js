import Header from '~/component/Layout/components/Header';
import Footer from '~/component/Layout/components/Footer';

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

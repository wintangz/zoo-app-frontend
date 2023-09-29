import Header from '~/component/Layout/components/Header';
import Banner from '../components/Banner';
import Footer from '~/component/Layout/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Banner />
            <div className="-container">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

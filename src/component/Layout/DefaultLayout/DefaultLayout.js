import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';
import Banner from '../components/Banner/Banner';

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

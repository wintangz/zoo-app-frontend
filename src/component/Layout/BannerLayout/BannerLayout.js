import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
function BannerLayout({ children }) {
    return (
        <div>
            <Header />
            <NormalBanner />
            {children}
            <Footer />
        </div>
    );
}

export default BannerLayout;

import Footer from '~/component/Layout/components/Footer/Footer';
import Header from '~/component/Layout/components/Header/Header';

function AnimalLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="-container">{children}</div>
            <Footer />
        </div>
    );
}

export default AnimalLayout;

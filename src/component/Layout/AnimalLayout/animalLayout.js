import Header from '~/component/Layout/components/Header';
import Footer from '~/component/Layout/components/Footer';

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

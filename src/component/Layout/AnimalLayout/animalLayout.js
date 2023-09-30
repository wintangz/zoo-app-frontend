import Header from '~/component/Layout/components/Header';
import AnimalBackground from '../components/AnimalBackground/animalBackground';
import Footer from '~/component/Layout/components/Footer';

function AnimalLayout({ children }) {
    return (
        <div>
            <Header />
            <AnimalBackground />
            <div className="-container">{children}</div>
            <Footer />
        </div>
    );
}

export default AnimalLayout;

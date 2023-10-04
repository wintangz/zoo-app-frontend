import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/component/Layout';
import { Fragment } from 'react';
import ScrollToTop from './component/ScrollToTop';
import AnimalLayout from './component/Layout/AnimalLayout/animalLayout';
import Animals from './pages/Animals/Animals';

export const NamePageContext = createContext();
export const BannerPageContext = createContext();
function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <NamePageContext.Provider value={route.name}>
                                        <BannerPageContext.Provider value={route.bannerImage}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </BannerPageContext.Provider>
                                    </NamePageContext.Provider>
                                }
                            />
                        );
                    })}
                    <Route
                        path='/animals/:animalId'
                        loader={({ params }) => {
                            console.log(params);
                        }}
                        element={
                            <AnimalLayout>
                                <Animals></Animals>
                            </AnimalLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

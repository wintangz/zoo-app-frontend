import { Fragment, createContext, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/component/Layout';
import { publicRoutes } from '~/routes';
import AnimalLayout from './component/Layout/AnimalLayout/animalLayout';
import ScrollToTop from './component/ScrollToTop';
import Animals from './pages/Animals/Animals';

export const NamePageContext = createContext();
export const BannerPageContext = createContext();
function App() {
    console.log("APP")
    useEffect(() => {
        // Clear localStorage when the application starts
        localStorage.removeItem('ticket_1');
        localStorage.removeItem('ticket_2');
        localStorage.removeItem('ticket_3');
        localStorage.removeItem('ticket_4');
    }, []);
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
                        if (route.Authen === "private") {
                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        localStorage.getItem('token') ?
                                            <NamePageContext.Provider value={route.name}>
                                                <BannerPageContext.Provider value={route.bannerImage}>
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                </BannerPageContext.Provider>
                                            </NamePageContext.Provider>
                                            : <Navigate to="/" />
                                    }
                                />
                            )

                        } else {
                            return (
                                <>
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
                                    <Route
                                        path='/animals/:habitat/:animalId'
                                        element={
                                            <AnimalLayout>
                                                <Animals></Animals>
                                            </AnimalLayout>
                                        }
                                    />
                                </>

                            )
                        }
                        // return (
                        //     <Route
                        //         key={index}
                        //         path={route.path}
                        //         element={
                        //             <NamePageContext.Provider value={route.name}>
                        //                 <BannerPageContext.Provider value={route.bannerImage}>
                        //                     <Layout>
                        //                         <Page />
                        //                     </Layout>
                        //                 </BannerPageContext.Provider>
                        //             </NamePageContext.Provider>
                        //         }
                        //     />
                        // );
                    })}

                </Routes>
            </div>
        </Router>
    );
}

export default App;

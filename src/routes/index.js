//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';

// import banner img
import aboutBanner from '~/assets/img/t1.jpg';

import Home from '~/pages/Home';
import About from '~/pages/About';

const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', bannerImage: aboutBanner },
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

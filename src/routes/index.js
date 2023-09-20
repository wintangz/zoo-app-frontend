//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';

// import banner img
import aboutBanner from '~/assets/img/t1.jpg';
import serviceBanner from '~/assets/img/t2.jpg';
import uploadBanner from '~/assets/img/t3.jpg';
import searchBanner from '~/assets/img/t4.jpg';



import Home from '~/pages/Home';
import About from '~/pages/About';
import Service from '~/pages/Service';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', bannerImage: aboutBanner  },
    { path: 'service', component: Service, layout: NormalLayout, name: 'Service', bannerImage: serviceBanner },
    { path: 'upload', component: Upload, layout: NormalLayout, name: 'Upload', bannerImage: uploadBanner },
    { path: 'search', component: Search, layout: NormalLayout, name: 'Search', bannerImage: searchBanner},
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

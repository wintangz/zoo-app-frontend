//public routes dont need login to redirect
//Layout
import { HeaderOnly } from '~/component/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Service from '~/pages/Service';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
const publicRoutes = [
    { path: '/', component: Home },
    { path: 'about', component: About },
    { path: 'service', component: Service },
    { path: 'upload', component: Upload, layout: HeaderOnly },
    { path: 'search', component: Search, layout: null },
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

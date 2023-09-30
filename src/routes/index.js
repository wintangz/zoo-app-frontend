//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';

// import banner img
import aboutBanner from '~/assets/img/t1.jpg';

import Home from '~/pages/Home';
import News from '~/pages/News';
import Animals from '~/pages/Animals';
import Ticket from '~/pages/Ticket';
import About from '~/pages/About';

const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News' },
    { path: 'animals', component: Animals, layout: NormalLayout, name: 'Animals' },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket' },
    { path: 'about', component: About, layout: NormalLayout, name: 'About' },
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

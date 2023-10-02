//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AnimalLayout from '~/component/Layout/AnimalLayout/animalLayout';
import BannerLayout from '~/component/Layout/BannerLayout';

// import banner img
import aboutBanner from '~/assets/img/t1.jpg';

import Home from '~/pages/Home';
import News from '~/pages/News';
import Animals from '~/pages/Animals/Animals';
import Ticket from '~/pages/Ticket';
import About from '~/pages/About';
import Habitats from '~/pages/Habitats';
import Maps from '~/pages/Maps';

const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News' },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals' },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket' },
    { path: 'about', component: About, layout: NormalLayout, name: 'About' },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Habitats' },
    { path: 'maps', component: Maps, layout: NormalLayout, name: 'maps' },
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

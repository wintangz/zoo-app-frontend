//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AnimalLayout from '~/component/Layout/AnimalLayout/animalLayout';
import AdminMainPage from '~/component/Layout/AdminMainPage';
// import banner img

import Home from '~/pages/Home';
import News from '~/pages/News';
import Animals from '~/pages/Animals/Animals';
import Ticket from '~/pages/Ticket';
import About from '~/pages/About';
import Habitats from '~/pages/Habitats';
import Maps from '~/pages/Maps';

//Admin routes
import Dashboard from '~/pages/AdminPage/Dashboard';
import Bar from '~/pages/AdminPage/Bar/index';
import Contacts from '~/pages/AdminPage/Contacts';
import FAQ from '~/pages/AdminPage/FAQ';
import Form from '~/pages/AdminPage/Form';
import Geography from '~/pages/AdminPage/Geography';
import Invoices from '~/pages/AdminPage/Invoices';
import Line from '~/pages/AdminPage/Line';
import Team from '~/pages/AdminPage/Team';
import Calendar from '~/pages/AdminPage/Calendar';
import Pie from '~/pages/AdminPage/Pie';
const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals', Authen: "public" },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket', Authen: "public" },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', Authen: "public" },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Habitats', Authen: "public" },
    { path: 'maps', component: Maps, layout: NormalLayout, name: 'Maps' },

    // Admin routes
    { path: 'dashboard', component: Dashboard, layout: AdminMainPage, name: 'Dasboard', Authen: "private" },
    { path: 'bar', component: Bar, layout: AdminMainPage, name: 'Bar', Authen: "private" },
    { path: 'contacts', component: Contacts, layout: AdminMainPage, name: 'Contacts', Authen: "private" },
    { path: 'faq', component: FAQ, layout: AdminMainPage, name: 'FAQ', Authen: "private" },
    { path: 'form', component: Form, layout: AdminMainPage, name: 'Form', Authen: "private" },
    { path: 'geography', component: Geography, layout: AdminMainPage, name: 'Geography', Authen: "private" },
    { path: 'invoices', component: Invoices, layout: AdminMainPage, name: 'Invoices', Authen: "private" },
    { path: 'line', component: Line, layout: AdminMainPage, name: 'Line', Authen: "private" },
    { path: 'pie', component: Pie, layout: AdminMainPage, name: 'Pie', Authen: "private" },
    { path: 'team', component: Team, layout: AdminMainPage, name: 'Team', Authen: "private" },
    { path: 'calendar', component: Calendar, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };

//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AdminMainPage from '~/component/Layout/AdminMainPage';
import AnimalLayout from '~/component/Layout/AnimalLayout/animalLayout';
// import banner img

import About from '~/pages/About';
import Animals from '~/pages/Animals/Animals';
import Habitats from '~/pages/Habitats';
import Home from '~/pages/Home';
import Maps from '~/pages/Maps';
import News from '~/pages/News';
import Ticket from '~/pages/Ticket';
import Summary from '~/pages/Ticket/Summary/index';

//Admin routes
// import Bar from '~/pages/AdminPage/Bar/index';
import Calendar from '~/pages/AdminPage/Calendar';
import CreateTicket from '~/pages/AdminPage/CreateTicket';
import EditProfile from '~/pages/AdminPage/EditProfile';
import Sercurity from '~/pages/AdminPage/EditProfile/Sercurity';
import Form from '~/pages/AdminPage/Form';
import NewsPostForm from '~/pages/AdminPage/New/createNews';
import ViewNews from '~/pages/AdminPage/New/new';
import Team from '~/pages/AdminPage/Team';
import UpdateStaff from "~/pages/AdminPage/UpdateStaff";
import ViewTicket from '~/pages/AdminPage/ViewTicket';
import ParentComponent from '~/pages/News/ViewEachNews/ParentComponent';
import ThankYouPage from '~/pages/Ticket/Thanks';
import CreateAnimal from '~/pages/AdminPage/CreateAnimal';
import ViewAnimals from '~/pages/AdminPage/ViewAnimal';
import AssignAnimal from '~/pages/AssignAnimal';


const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: "news/:id/:title", component: ParentComponent, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals', Authen: "public" },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket', Authen: "public" },
    { path: 'summary', component: Summary, layout: NormalLayout, name: 'Summary', Authen: "public" },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', Authen: "public" },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Habitats', Authen: "public" },
    { path: 'maps', component: Maps, layout: NormalLayout, name: 'Maps' },
    { path: 'thanks', component: ThankYouPage, layout: NormalLayout, name: 'Thanks' },

    // Admin routes

    { path: 'team', component: Team, layout: AdminMainPage, name: 'Team', Authen: "private" },
    { path: 'calendar', component: Calendar, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'staff/form', component: Form, layout: AdminMainPage, name: 'Form', Authen: "private" },
    { path: 'staff/update/:userId', component: UpdateStaff, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'edit', component: EditProfile, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'edit/sercurity', component: Sercurity, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'tickets/view', component: ViewTicket, layout: AdminMainPage, name: 'viewTicket', Authen: "private" },
    { path: 'tickets/create', component: CreateTicket, layout: AdminMainPage, name: 'createTicket', Authen: "private" },
    { path: 'viewallnew', component: ViewNews, layout: AdminMainPage, name: 'ViewNews', Authen: "private" },
    { path: 'create/news', component: NewsPostForm, layout: AdminMainPage, name: 'CreateNews', Authen: "private" },
    { path: 'animal/create', component: CreateAnimal, layout: AdminMainPage, name: 'createAnimal;', Authen: "private" },
    { path: 'animal/view', component: ViewAnimals, layout: AdminMainPage, name: 'viewAnimal;', Authen: "private" },
    { path: 'animal/assign/', component: AssignAnimal, layout: AdminMainPage, name: 'AssignAnimal;', Authen: "private" },


];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };


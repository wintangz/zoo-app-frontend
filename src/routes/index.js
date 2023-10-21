//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AdminMainPage from '~/component/Layout/AdminMainPage/AdminMainPage';
import AnimalLayout from '~/component/Layout/AnimalLayout/animalLayout';
// import banner img

import About from '~/pages/About/About';
import Animals from '~/pages/Animals/Animals';
import Habitats from '~/pages/Habitats/Habitats';
import Home from '~/pages/Home/Home';
import Maps from '~/pages/Map/Map';
import News from '~/pages/News';
import Profile from '~/pages/Profile/index';
import Summary from '~/pages/Ticket/Summary/Summary';
import Ticket from '~/pages/Ticket/Ticket';

//Admin routes
// import Bar from '~/pages/AdminPage/Bar/index';
import { createDiet } from '~/api/dietService';
import Calendar from '~/pages/AdminPage/Calendar';
import TicketScanner from '~/pages/AdminPage/CheckTicket/checkTicket';
import CreateAnimal from '~/pages/AdminPage/CreateAnimal';
import CreateEnclosure from '~/pages/AdminPage/CreateEnclosure';
import CreateHabitat from '~/pages/AdminPage/CreateHabitat';
import CreateTicket from '~/pages/AdminPage/CreateTicket';
import ViewDiet from '~/pages/AdminPage/Diet/Diet';
import EditProfile from '~/pages/AdminPage/EditProfile';
import Sercurity from '~/pages/AdminPage/EditProfile/Sercurity';
import CreateFood from '~/pages/AdminPage/Food/CreateFood';
import ViewFood from '~/pages/AdminPage/Food/Food';
import UpdateFood from '~/pages/AdminPage/Food/UpdateFood';
import Form from '~/pages/AdminPage/Form';
import NewsPostForm from '~/pages/AdminPage/New/createNews';
import ViewNews from '~/pages/AdminPage/New/News';
import UpdateNews from '~/pages/AdminPage/New/UpdateNews';
import ViewSpecies from '~/pages/AdminPage/Species/Species';
import Team from '~/pages/AdminPage/Team';
import UpdateStaff from "~/pages/AdminPage/UpdateStaff";
import ViewAnimals from '~/pages/AdminPage/ViewAnimal';
import ViewEnclosure from '~/pages/AdminPage/ViewEnclosure';
import ViewHatbitat from '~/pages/AdminPage/ViewHabitat';
import ViewTicket from '~/pages/AdminPage/ViewTicket';
import AssignAnimal from '~/pages/AdminPage/AssignAnimal';
import ParentComponent from '~/pages/News/ViewEachNews/ParentComponent';
import ThankYouPage from '~/pages/Ticket/Thanks';
import FeedSchedule from '~/pages/AdminPage/FeedSchedule';
import Confirm from '~/pages/AdminPage/Confirm/confirm';
import ViewSchedule from '~/pages/AdminPage/ViewSchedule/ViewSchedule';
import UpdateSchedule from '~/pages/AdminPage/UpdateSchedule/UpdateSchedule';


const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: "news/:id/:title", component: ParentComponent, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals', Authen: "public" },
    { path: 'profile', component: Profile, layout: AnimalLayout, name: 'Profile', Authen: "public" },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket', Authen: "public" },
    { path: 'summary', component: Summary, layout: NormalLayout, name: 'Summary', Authen: "public" },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', Authen: "public" },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Habitats', Authen: "public" },
    { path: 'map', component: Maps, layout: NormalLayout, name: 'Map' },
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

    { path: 'viewallnews', component: ViewNews, layout: AdminMainPage, name: 'ViewNews', Authen: "private" },
    { path: 'create/news', component: NewsPostForm, layout: AdminMainPage, name: 'CreateNews', Authen: "private" },
    { path: 'update/news/:newsId', component: UpdateNews, layout: AdminMainPage, name: 'UpdateNews', Authen: "private" },

    { path: 'viewfoods', component: ViewFood, layout: AdminMainPage, name: 'ViewFood', Authen: "private" },
    { path: 'create/foods', component: CreateFood, layout: AdminMainPage, name: 'CreateFood', Authen: "private" },
    { path: 'update/foods/:foodId', component: UpdateFood, layout: AdminMainPage, name: 'UpdateFood', Authen: "private" },

    { path: 'viewdiets', component: ViewDiet, layout: AdminMainPage, name: 'ViewDiet', Authen: "private" },
    { path: 'create/diet', component: createDiet, layout: AdminMainPage, name: 'createDiet', Authen: "private" },

    { path: 'viewspecies', component: ViewSpecies, layout: AdminMainPage, name: 'ViewSpecies', Authen: "private" },

    { path: 'animal/create', component: CreateAnimal, layout: AdminMainPage, name: 'createAnimal;', Authen: "private" },
    { path: 'animal/view', component: ViewAnimals, layout: AdminMainPage, name: 'viewAnimal;', Authen: "private" },
    { path: 'animal/assign/', component: AssignAnimal, layout: AdminMainPage, name: 'AssignAnimal;', Authen: "private" },
    { path: 'animal/feed', component: FeedSchedule, layout: AdminMainPage, name: 'feed;', Authen: "private" },
    { path: 'animal/schedule/view', component: ViewSchedule, layout: AdminMainPage, name: 'viewSchedule;', Authen: "private" },
    { path: 'animal/confirm', component: Confirm, layout: AdminMainPage, name: 'confirm;', Authen: "private" },
    { path: 'animal/schedule/update', component: UpdateSchedule, layout: AdminMainPage, name: 'updateSchedule;', Authen: "private" },
    { path: 'enclosure/view', component: ViewEnclosure, layout: AdminMainPage, name: 'viewEnclosure;', Authen: "private" },
    { path: 'enclosure/create', component: CreateEnclosure, layout: AdminMainPage, name: 'createEnclosure;', Authen: "private" },
    { path: 'checkticket', component: TicketScanner, layout: AdminMainPage, name: 'ticketScanner;', Authen: "private" },
    { path: '/habitat/view', component: ViewHatbitat, layout: AdminMainPage, name: 'viewHabitat;', Authen: "private" },
    { path: '/habitat/create', component: CreateHabitat, layout: AdminMainPage, name: 'createHabitat;', Authen: "private" },


];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };


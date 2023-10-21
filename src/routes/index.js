//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AdminMainPage from '~/component/Layout/AdminMainPage/AdminMainPage';
import AnimalLayout from '~/component/Layout/AnimalLayout/AnimalLayout';
// import banner img

import InputNewPassword from '~/component/Layout/components/ForgotPassword/InputNewPassword';
import Verify from '~/component/Layout/components/ForgotPassword/Verify/Verify';
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
import AssignAnimal from '~/pages/AdminPage/AssignAnimal';
import Calendar from '~/pages/AdminPage/Calendar';
import TicketScanner from '~/pages/AdminPage/CheckTicket/checkTicket';
import Confirm from '~/pages/AdminPage/Confirm/confirm';
import CreateAnimal from '~/pages/AdminPage/CreateAnimal';
import CreateEnclosure from '~/pages/AdminPage/CreateEnclosure';
import CreateHabitat from '~/pages/AdminPage/CreateHabitat';
import CreateTicket from '~/pages/AdminPage/CreateTicket';
import CreateDiet from '~/pages/AdminPage/Diet/CreateDiet';
import ViewDiet from '~/pages/AdminPage/Diet/Diet';
import EditProfile from '~/pages/AdminPage/EditProfile';
import Sercurity from '~/pages/AdminPage/EditProfile/Sercurity';
import FeedSchedule from '~/pages/AdminPage/FeedSchedule';
import CreateFood from '~/pages/AdminPage/Food/CreateFood';
import ViewFood from '~/pages/AdminPage/Food/Food';
import UpdateFood from '~/pages/AdminPage/Food/UpdateFood';
import Form from '~/pages/AdminPage/Form';
import NewsPostForm from '~/pages/AdminPage/New/CreateNews';
import ViewNews from '~/pages/AdminPage/New/News';
import UpdateNews from '~/pages/AdminPage/New/UpdateNews';
import CreateSpecies from '~/pages/AdminPage/Species/CreateSpecies';
import ViewSpecies from '~/pages/AdminPage/Species/Species';
import UpdateSpecies from '~/pages/AdminPage/Species/UpdateSpecies';
import Team from '~/pages/AdminPage/Team';
import UpdateEnclosure from '~/pages/AdminPage/UpdateEnclosure';
import UpdateHabitat from '~/pages/AdminPage/UpdateHabitat';
import UpdateSchedule from '~/pages/AdminPage/UpdateSchedule/UpdateSchedule';
import UpdateStaff from "~/pages/AdminPage/UpdateStaff";
import ViewAnimals from '~/pages/AdminPage/ViewAnimal';
import ViewEnclosure from '~/pages/AdminPage/ViewEnclosure';
import ViewHabitat from '~/pages/AdminPage/ViewHabitat';
import ViewSchedule from '~/pages/AdminPage/ViewSchedule/ViewSchedule';
import ViewTicket from '~/pages/AdminPage/ViewTicket';
import ParentComponent from '~/pages/News/ViewEachNews/ParentComponent';
import ThankYouPage from '~/pages/Ticket/Thanks';
import MoveInEnclosure from '~/pages/AdminPage/MoveInEnclosure/moveInEnclosure';


const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: "news/:id/:title", component: ParentComponent, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals', Authen: "public" },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket', Authen: "public" },
    { path: 'summary', component: Summary, layout: NormalLayout, name: 'Summary', Authen: "public" },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', Authen: "public" },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Habitats', Authen: "public" },
    { path: 'map', component: Maps, layout: NormalLayout, name: 'Map' },
    { path: 'thanks', component: ThankYouPage, layout: NormalLayout, name: 'Thanks' },
    { path: 'verify', component: Verify, layout: NormalLayout, name: 'Verify', Authen: "public" },
    { path: 'inputnewpassword', component: InputNewPassword, layout: NormalLayout, name: 'InputNewPassword', Authen: "public" },
    { path: 'profile', component: Profile, layout: NormalLayout, name: 'Profile', Authen: "private" },


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
    { path: 'create/diet', component: CreateDiet, layout: AdminMainPage, name: 'CreateDiet', Authen: "private" },

    { path: 'viewspecies', component: ViewSpecies, layout: AdminMainPage, name: 'ViewSpecies', Authen: "private" },
    { path: 'create/species', component: CreateSpecies, layout: AdminMainPage, name: 'CreateSpecies', Authen: "private" },
    { path: 'update/species/:speciesId', component: UpdateSpecies, layout: AdminMainPage, name: 'UpdateSpecies', Authen: "private" },

    { path: 'animal/create', component: CreateAnimal, layout: AdminMainPage, name: 'createAnimal;', Authen: "private" },
    { path: 'animal/view', component: ViewAnimals, layout: AdminMainPage, name: 'viewAnimal;', Authen: "private" },
    { path: 'animal/assign/', component: AssignAnimal, layout: AdminMainPage, name: 'AssignAnimal;', Authen: "private" },
    { path: 'animal/feed', component: FeedSchedule, layout: AdminMainPage, name: 'feed;', Authen: "private" },
    { path: 'animal/schedule/view', component: ViewSchedule, layout: AdminMainPage, name: 'viewSchedule;', Authen: "private" },
    { path: 'animal/confirm', component: Confirm, layout: AdminMainPage, name: 'confirm;', Authen: "private" },
    { path: 'animal/schedule/update', component: UpdateSchedule, layout: AdminMainPage, name: 'updateSchedule;', Authen: "private" },

    { path: 'enclosure/create', component: CreateEnclosure, layout: AdminMainPage, name: 'CreateEnclosure;', Authen: "private" },
    { path: 'enclosure/view', component: ViewEnclosure, layout: AdminMainPage, name: 'ViewEnclosure;', Authen: "private" },
    { path: 'enclosure/update/:enclosureId', component: UpdateEnclosure, layout: AdminMainPage, name: 'UpdateEnlosure', Authen: "private" },
    { path: 'habitat/create', component: CreateHabitat, layout: AdminMainPage, name: 'CreateHabitat;', Authen: "private" },
    { path: 'habitat/view', component: ViewHabitat, layout: AdminMainPage, name: 'ViewHatbitat;', Authen: "private" },
    { path: 'habitat/update/:habitatId', component: UpdateHabitat, layout: AdminMainPage, name: 'UpdateHabitat', Authen: "private" },
    { path: 'checkticket', component: TicketScanner, layout: AdminMainPage, name: 'TicketScanner;', Authen: "private" },
    { path: '/enclosure/in', component: MoveInEnclosure, layout: AdminMainPage, name: 'moveInEnclosure;', Authen: "private" },


];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };


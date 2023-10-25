//public routes dont need login to redirect
//Layout
import { NormalLayout } from '~/component/Layout';
import AdminMainPage from '~/component/Layout/AdminMainPage/AdminMainPage';
import AnimalLayout from '~/component/Layout/AnimalLayout/AnimalLayout';
import ProfileUserLayout from '~/component/Layout/ProfileUserLayout/ProfileUserLayout';
// import banner img

import InputNewPassword from '~/component/Layout/components/ForgotPassword/InputNewPassword/InputNewPassword';
import Verify from '~/component/Layout/components/ForgotPassword/Verify/Verify';
import About from '~/pages/About/About';
import Animals from '~/pages/Animals/Animals';
import Habitats from '~/pages/Habitats/Habitats';
import Home from '~/pages/Home/Home';
import Maps from '~/pages/Map/Map';
import News from '~/pages/News';
import Profile from '~/pages/Profile/Profile';
import SecurityUser from '~/pages/Profile/SecurityUser/SecurityUser';
import Summary from '~/pages/Ticket/Summary/Summary';
import Ticket from '~/pages/Ticket/Ticket';

//Admin routes
// import Bar from '~/pages/AdminPage/Bar/index';
import ViewAnimals from '~/pages/AdminPage/Animal';
import AssignAnimal from '~/pages/AdminPage/Animal/AssignAnimal';
import CreateAnimal from '~/pages/AdminPage/Animal/CreateAnimal';
import Calendar from '~/pages/AdminPage/Calendar';
import TicketScanner from '~/pages/AdminPage/CheckTicket/checkTicket';
import Confirm from '~/pages/AdminPage/Confirm/confirm';
import CreateCustomer from '~/pages/AdminPage/Customer/CreateCustomer';
import ViewCustomers from '~/pages/AdminPage/Customer/ViewCustomers';
import CreateDiet from '~/pages/AdminPage/Diet/CreateDiet';
import ViewDiet from '~/pages/AdminPage/Diet/Diet';
import UpdateDiets from '~/pages/AdminPage/Diet/UpdateDiet';
import CreateEnclosure from '~/pages/AdminPage/Enclosure/CreateEnclosure';
import UpdateEnclosure from '~/pages/AdminPage/Enclosure/UpdateEnclosure';
import ViewEnclosure from '~/pages/AdminPage/Enclosure/ViewEnclosure';
import MoveInEnclosure from '~/pages/AdminPage/Enclosure/moveInEnclosure';
import CreateFood from '~/pages/AdminPage/Food/CreateFood';
import ViewFood from '~/pages/AdminPage/Food/Food';
import UpdateFood from '~/pages/AdminPage/Food/UpdateFood';
import CreateHabitat from '~/pages/AdminPage/Habitat/CreateHabitat';
import UpdateHabitat from '~/pages/AdminPage/Habitat/UpdateHabitat';
import ViewHabitat from '~/pages/AdminPage/Habitat/ViewHabitat';
import NewsPostForm from '~/pages/AdminPage/New/CreateNews';
import ViewNews from '~/pages/AdminPage/New/News';
import UpdateNews from '~/pages/AdminPage/New/UpdateNews';
import ViewOrdersTickets from '~/pages/AdminPage/Order/ViewAllPurchasedTickets';
import ViewOrders from '~/pages/AdminPage/Order/ViewOrder';
import FeedSchedule from '~/pages/AdminPage/Schedule/FeedSchedule';
import UpdateSchedule from '~/pages/AdminPage/Schedule/UpdateSchedule';
import ViewSchedule from '~/pages/AdminPage/Schedule/ViewSchedule';
import CreateSpecies from '~/pages/AdminPage/Species/CreateSpecies';
import ViewSpecies from '~/pages/AdminPage/Species/Species';
import UpdateSpecies from '~/pages/AdminPage/Species/UpdateSpecies';
import Form from '~/pages/AdminPage/Team/CreateUser';
import EditProfile from '~/pages/AdminPage/Team/EditProfile';
import UpdateStaff from "~/pages/AdminPage/Team/UpdateStaff";
import Team from '~/pages/AdminPage/Team/ViewUser';
import { default as CreateTicket, default as ViewTicket } from '~/pages/AdminPage/Ticket';
import ParentComponent from '~/pages/News/ViewEachNews/ParentComponent';
import ThankYouPage from '~/pages/Ticket/Thanks';
import Order from '~/pages/Order/Order';
import NormalBanner from '~/component/Layout/components/NormalBanner/NormalBanner';
import BannerLayout from '~/component/Layout/BannerLayout/BannerLayout';


const publicRoutes = [
    { path: '/', component: Home, name: 'Home' },
    { path: 'news', component: News, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: "news/:id/:title", component: ParentComponent, layout: NormalLayout, name: 'News', Authen: "public" },
    { path: 'animals', component: Animals, layout: AnimalLayout, name: 'Animals', Authen: "public" },
    { path: 'profile', component: Profile, layout: ProfileUserLayout, name: 'Profile', Authen: "private" },
    { path: 'profile/security', component: SecurityUser, layout: ProfileUserLayout, name: 'SecurityUser', Authen: "private" },
    { path: 'ticket', component: Ticket, layout: NormalLayout, name: 'Ticket', Authen: "public" },
    { path: 'summary', component: Summary, layout: NormalLayout, name: 'Summary', Authen: "public" },
    { path: 'about', component: About, layout: NormalLayout, name: 'About', Authen: "public" },
    { path: 'habitats', component: Habitats, layout: NormalLayout, name: 'Ha    bitats', Authen: "public" },
    { path: 'map', component: Maps, layout: NormalLayout, name: 'Map' },
    { path: 'thanks', component: ThankYouPage, layout: NormalLayout, name: 'Thanks' },
    { path: 'verify', component: Verify, layout: NormalLayout, name: 'Verify', Authen: 'public' },
    { path: 'inputnewpassword', component: InputNewPassword, layout: NormalLayout, name: 'InputNewPassword', Authen: "public" },
    { path: 'order', component: Order, layout: BannerLayout, name: 'Order', Authen: "public" },


    // Admin routes
    { path: 'home', component: Team, layout: AdminMainPage, name: 'Team', Authen: "private" },
    { path: 'calendar', component: Calendar, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'home/staff/create', component: Form, layout: AdminMainPage, name: 'Form', Authen: "private" },
    { path: 'home/staff/update/:userId', component: UpdateStaff, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'home/edit', component: EditProfile, layout: AdminMainPage, name: 'Calendar', Authen: "private" },
    { path: 'home/tickets', component: ViewTicket, layout: AdminMainPage, name: 'viewTicket', Authen: "private" },
    { path: 'home/tickets/create', component: CreateTicket, layout: AdminMainPage, name: 'createTicket', Authen: "private" },

    { path: 'home/customers', component: ViewCustomers, layout: AdminMainPage, name: 'ViewCustomers', Authen: "private" },
    { path: 'home/customers/create', component: CreateCustomer, layout: AdminMainPage, name: 'CreateCustomer', Authen: "private" },

    { path: 'home/news', component: ViewNews, layout: AdminMainPage, name: 'ViewNews', Authen: "private" },
    { path: 'home/news/create', component: NewsPostForm, layout: AdminMainPage, name: 'CreateNews', Authen: "private" },
    { path: 'home/news/update/:newsId', component: UpdateNews, layout: AdminMainPage, name: 'UpdateNews', Authen: "private" },

    { path: 'home/foods', component: ViewFood, layout: AdminMainPage, name: 'ViewFood', Authen: "private" },
    { path: 'home/foods/create', component: CreateFood, layout: AdminMainPage, name: 'CreateFood', Authen: "private" },
    { path: 'home/foods/update/:foodId', component: UpdateFood, layout: AdminMainPage, name: 'UpdateFood', Authen: "private" },

    { path: 'home/diets', component: ViewDiet, layout: AdminMainPage, name: 'ViewDiet', Authen: "private" },
    { path: 'home/diets/create', component: CreateDiet, layout: AdminMainPage, name: 'CreateDiet', Authen: "private" },
    { path: 'home/diets/update/:dietsId', component: UpdateDiets, layout: AdminMainPage, name: 'UpdateDiets', Authen: "private" },

    { path: 'home/species', component: ViewSpecies, layout: AdminMainPage, name: 'ViewSpecies', Authen: "private" },
    { path: 'home/species/create', component: CreateSpecies, layout: AdminMainPage, name: 'CreateSpecies', Authen: "private" },
    { path: 'home/species/update/:speciesId', component: UpdateSpecies, layout: AdminMainPage, name: 'UpdateSpecies', Authen: "private" },

    { path: 'home/orders', component: ViewOrders, layout: AdminMainPage, name: 'ViewOrders', Authen: "private" },
    { path: 'home/orderstickets', component: ViewOrdersTickets, layout: AdminMainPage, name: 'ViewOrdersTickets', Authen: "private" },

    { path: 'home/animal/create', component: CreateAnimal, layout: AdminMainPage, name: 'createAnimal;', Authen: "private" },
    { path: 'home/animal', component: ViewAnimals, layout: AdminMainPage, name: 'viewAnimal;', Authen: "private" },
    { path: 'home/animal/assign/', component: AssignAnimal, layout: AdminMainPage, name: 'AssignAnimal;', Authen: "private" },
    { path: 'home/animal/feed', component: FeedSchedule, layout: AdminMainPage, name: 'feed;', Authen: "private" },
    { path: 'home/animal/schedule', component: ViewSchedule, layout: AdminMainPage, name: 'viewSchedule;', Authen: "private" },
    { path: 'home/animal/confirm', component: Confirm, layout: AdminMainPage, name: 'confirm;', Authen: "private" },
    { path: 'home/animal/schedule/update', component: UpdateSchedule, layout: AdminMainPage, name: 'updateSchedule;', Authen: "private" },

    { path: 'home/enclosure/create', component: CreateEnclosure, layout: AdminMainPage, name: 'CreateEnclosure;', Authen: "private" },
    { path: 'home/enclosure', component: ViewEnclosure, layout: AdminMainPage, name: 'ViewEnclosure;', Authen: "private" },
    { path: 'home/enclosure/update/:enclosureId', component: UpdateEnclosure, layout: AdminMainPage, name: 'UpdateEnlosure', Authen: "private" },

    { path: 'home/habitat/create', component: CreateHabitat, layout: AdminMainPage, name: 'CreateHabitat;', Authen: "private" },
    { path: 'home/habitat', component: ViewHabitat, layout: AdminMainPage, name: 'ViewHatbitat;', Authen: "private" },
    { path: 'home/habitat/update/:habitatId', component: UpdateHabitat, layout: AdminMainPage, name: 'UpdateHabitat', Authen: "private" },

    { path: 'home/checkticket', component: TicketScanner, layout: AdminMainPage, name: 'TicketScanner;', Authen: "private" },
    { path: '/enclosure/in', component: MoveInEnclosure, layout: AdminMainPage, name: 'moveInEnclosure;', Authen: "private" },


];

// private routes dont login will redirect to login pages
const privateRoutes = [];

export { privateRoutes, publicRoutes };


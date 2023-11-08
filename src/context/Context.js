import { createContext, useContext, useEffect, useState } from 'react';
import { getNews, getRecommend } from '~/api/newsService';
import { getTickets } from '~/api/ticketService';
import { convertTicketToCart } from '~/utils/convertTicketToCart';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
export default function Context({ children }) {

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [tickets, setTickets] = useState([]);
    const [cart, setCart] = useState([]);

    const [auth, setAuth] = useState(false)//check Login
    const [userAuth, setUserAuth] = useState(undefined);
    //news
    const [newsResult, setNewsResult] = useState(null);
    //recommendCard
    const [recommendResult, setRecommendResult] = useState(null);

    const fetchData = async () => {
        const result = await getTickets();
        setTickets(result);
        setCart(convertTicketToCart(result));

        const resultRecommend = await getRecommend();
        const recommendWithTrueStatus = resultRecommend.filter((recommend) => recommend.status === true);
        setRecommendResult(recommendWithTrueStatus);

        const resultTitle = await getNews();
        const newsWithTrueStatus = resultTitle.filter((news) => news.status === true);
        setNewsResult(newsWithTrueStatus);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ auth, setAuth, recommendResult, setRecommendResult, newsResult, setNewsResult, userAuth, setUserAuth, totalPrice, totalQuantity, setTotalPrice, setTotalQuantity, tickets, setTickets, setCart, cart }}>
            {children}
        </AppContext.Provider>
    );
}
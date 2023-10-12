import { createContext, useContext, useEffect, useState } from 'react';
import { getTickets } from '~/api/ticketService';
import { convertTicketToCart } from '~/utils/convertTicketToCart';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
export default function Context({ children }) {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    // const [auth, setAuth] = useState(false)//check Login
    const [tickets, setTickets] = useState([]);
    const [cart, setCart] = useState([]);
    const [userAuth, setUserAuth] = useState(undefined);

    const fetchData = async () => {
        const result = await getTickets();
        setTickets(result);
        setCart(convertTicketToCart(result));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ userAuth, setUserAuth, totalPrice, totalQuantity, setTotalPrice, setTotalQuantity, tickets, setTickets, setCart, cart }}>
            {children}
        </AppContext.Provider>
    );
}
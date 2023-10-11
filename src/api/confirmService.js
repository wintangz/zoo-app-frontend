// import * as axiosClient from '~/utils/axiosClient';
import api from "~/utils/axiosClient";

// export const postTicket = async (dataForm) => {
//     try {
//         const res = await axiosClient.post('orders', dataForm)
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


export const confirmTicketPurchase = async (cart, totalPrice, totalQuantity) => {
    try {
        const ticketItems = cart.map(item => ({ ticketId: item.id, quantity: item.quantity }));
        const body = {
            paymentMethod: "VNPAY",
            ticketItems: ticketItems
        };
        console.log(body);
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const res = await api.post('orders', body, config)
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw new Error('Error during purchase: ' + error.message);
    }
};
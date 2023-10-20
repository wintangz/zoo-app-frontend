import * as axiosClient from '~/utils/axiosClient';

// export const postTicket = async (dataForm) => {
//     try {
//         const res = await axiosClient.post('orders', dataForm)
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


export const confirmTicketPurchase = async (cart) => {
    try {
        const ticketItems = cart.map(item => ({ ticketId: item.id, quantity: item.quantity }));
        const body = {
            paymentMethod: "VNPAY",
            ticketItems: ticketItems
        };
        // console.log(body);

        const res = await axiosClient.post('orders', body)
        // console.log(res.data);
        return res.data;
    } catch (error) {
        throw new Error('Error during purchase: ' + error.message);
    }
};
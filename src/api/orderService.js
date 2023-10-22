import * as axiosClient from '~/utils/axiosClient';
export const getOrders = async () => {
    try {
        const res = await axiosClient.get('orders')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const getOrdersTickets = async () => {
    try {
        const res = await axiosClient.get('orders/tickets')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
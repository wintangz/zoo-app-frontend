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

export const getOrderByCusId = async (values) => {
    try {
        const res = await axiosClient.get(`users/${values}/orders`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const getOrderDetailByOderId = async (values) => {
    try {
        const res = await axiosClient.get(`orders/${values}/tickets`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}
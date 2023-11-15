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
        const res = await axiosClient.get(`orders/${values}`)
        return res;
    } catch (error) {
        return error.response;
    }
}

export const ApiRequest = async (values) => {
    try {
        const res = await axiosClient.get(`orders/payment?vnp_TxnRef=${values.params.vnp_TxnRef}&vnp_ResponseCode=${values.params.vnp_ResponseCode}&vnp_OrderInfo=${values.params.vnp_OrderInfo}&vnp_BankCode=${values.params.vnp_BankCode}&vnp_Amount=${values.params.vnp_Amount}`)
        return res.data;
    } catch (error) {
        return error.response;
    }
}
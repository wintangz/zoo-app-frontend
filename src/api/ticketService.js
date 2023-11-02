import * as axiosClient from '~/utils/axiosClient';

export const getTickets = async () => {
    try {
        const res = await axiosClient.get('tickets')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
export const createTicket = async (values) => {
    try {
        const res = await axiosClient.post('tickets', values);
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const deleteTicket = async (id) => {
    try {
        const res = await axiosClient.remove(`tickets/${id}`);
        return res;
    } catch (error) {
        return error.response;
    }
}
export const checkTicketByQr = async (text) => {
    try {
        const res = await axiosClient.get(`orders/verification${text}`);
        return res;
    } catch (error) {
        return error.response.data;
        // console.log(error);
    }
}
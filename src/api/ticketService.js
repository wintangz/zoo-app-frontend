import * as axiosClient from '~/utils/axiosClient';
export const getTickets = async () => {
    try {
        const res = await axiosClient.get('tickets')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const createTicket = async (values) => {
    try {
        const res = await axiosClient.post('tickets', values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const checkTicketByQr = async (ticketData) => {
    try {
        const res = await axiosClient.post('', ticketData);
        return res;
    } catch (error) {
        console.log(error);
    }
}
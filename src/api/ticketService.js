import * as axiosClient from '~/utils/axiosClient';

export const getTickets = async () => {
    try {
        const res = await axiosClient.get('tickets')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
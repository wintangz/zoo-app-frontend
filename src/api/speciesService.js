import * as axiosClient from '~/utils/axiosClient';
export const getSpecies = async () => {
    try {
        const res = await axiosClient.get('species')
        return res.data;
    } catch (error) {
        return error.response;
    }
}
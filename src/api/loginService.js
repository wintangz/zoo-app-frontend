import * as axiosClient from '~/utils/axiosClient';

export const registerUser = async (userData) => {
    try {
        const res = await axiosClient.post('users/customers', userData)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
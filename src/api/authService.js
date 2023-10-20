import * as axiosClient from '~/utils/axiosClient';

export const registerUser = async (userData) => {
    try {
        const res = await axiosClient.post('users/customers', userData)
        console.log(res);
        return res.data;

    } catch (error) {
        return error.response;
    }
}
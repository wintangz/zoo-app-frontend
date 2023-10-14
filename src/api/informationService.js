import * as axiosClient from '~/utils/axiosClient';
import { decode } from '~/utils/axiosClient';

export const getInfo = async (token) => {
    try {

        const userId = decode(token).sub;
        // const userId = 1;
        const result = await axiosClient.get(`users/${userId}`)

        return result.data;
    } catch (error) {
        console.log(error);
    }
}

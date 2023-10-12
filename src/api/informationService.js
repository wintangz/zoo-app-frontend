import * as axiosClient from '~/utils/axiosClient';
import { decode } from '~/utils/axiosClient';

export const getInfo = async (token) => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const userId = decode(token).userId;
        // const userId = 1;
        const result = await axiosClient.get(`users/${userId}`, config)

        return result.data;
    } catch (error) {
        console.log(error);
    }
}

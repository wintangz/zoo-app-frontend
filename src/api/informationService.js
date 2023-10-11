import * as axiosClient from '~/utils/axiosClient';

export const getInfo = async () => {
    try {
        const res = await axiosClient.get('users')
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        return res.data;
    } catch (error) {
        console.log(error);
    }
}
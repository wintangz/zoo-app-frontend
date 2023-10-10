import * as axiosClient from '~/utils/axiosClient';

export const postTicket = async (dataForm) => {
    try {
        const res = await axiosClient.post('', dataForm)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


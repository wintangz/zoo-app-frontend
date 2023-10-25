import * as axiosClient from '~/utils/axiosClient';

export const createHealthCare = async (values) => {
    try {
        const res = await axiosClient.post("health_records", values);
        return res.data;
    } catch (error) {
        return error.response;
    }
}
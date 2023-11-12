import * as axiosClient from '~/utils/axiosClient';

export const createHealthCare = async (values) => {
    try {
        const res = await axiosClient.post("health_records", values);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const getHealthCare = async () => {
    try {
        const res = await axiosClient.get("health_records");
        return res.data;
    } catch (error) {
        return error.response;
    }
}

export const updateHealthCare = async (id, values) => {
    try {
        const res = await axiosClient.put(`health_records/${id}`, values);
        return res;
    } catch (error) {
        return error.response;
    }
}
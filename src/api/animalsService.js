import * as axiosClient from '~/utils/axiosClient';

export const getAnimals = async () => {
    try {
        const res = await axiosClient.get('species')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getHabitats = async () => {
    try {
        const res = await axiosClient.get('habitats')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
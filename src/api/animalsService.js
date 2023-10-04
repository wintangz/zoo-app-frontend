import * as request from '~/utils/request'

export const getAnimals = async () => {
    try {
        const res = await request.get('species')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
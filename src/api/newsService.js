import * as axiosClient from '~/utils/axiosClient';

export const getRecommend = async () => {
    try {
        const res = await axiosClient.get('news/recommend')
        // console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getNews = async () => {
    try {
        const res = await axiosClient.get('news')
        // console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getNewsById = async (id) => {
    try {
        const res = await axiosClient.get(`news/${id}`);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const createNews = async (values) => {
    try {

        const res = await axiosClient.post('news', values);

        return res;
    } catch (error) {
    }
}
import * as request from '~/utils/request'

export const getRecommend = async () => {
    try {
        const res = await request.get('news/recommend')
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
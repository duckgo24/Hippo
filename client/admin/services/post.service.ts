import { StatisticalData2 } from "@/types";
import axiosJWT from "@/utils/axios.interceptor";



const getStatisticalPost = async (start_day: string, end_day: string): Promise<StatisticalData2> => {
    const res = await axiosJWT.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/get-statistical`, {
        params: {
            start_day,
            end_day
        }
    });
    return res.data;
}


export const postService = {
    getStatisticalPost
}
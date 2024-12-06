import { StatisticalData } from "@/types";
import axiosJWT from "@/utils/axios.interceptor";
import axios from "axios";

async function getNumAccountByTime(start_day: string, end_day: string): Promise<any> {
    const res = await axiosJWT.get(`${process.env.NEXT_PUBLIC_API_URL}/statistical/get-number-account`, {
        params: {
            start_day,
            end_day
        }
    });
    return res.data;
}

async function getNumPostByTime(start_day: string, end_day: string): Promise<any> {
    const res = await axiosJWT.get(`${process.env.NEXT_PUBLIC_API_URL}/statistical/get-number-post`, {
        params: {
            start_day,
            end_day
        }
    });
    return res.data;
}   


async function getNumVideoByTime(start_day: string, end_day: string): Promise<any> {
    const res = await axiosJWT.get(`${process.env.NEXT_PUBLIC_API_URL}/statistical/get-number-video`, {
        params: {
            start_day,
            end_day
        }
    });
    return res.data;
}   


export const statisticalService = {
    getNumAccountByTime,
    getNumPostByTime,
    getNumVideoByTime
};
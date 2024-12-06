import axios from "axios";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";
import avt from "../../images/white-avatar.png";

async function authMe() {

    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/me`);
    return res.data;

}

async function register(username, password) {

    await delay(2000);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, {
        username,
        password,
        avatar: avt
    });
    return res.data;

}

async function login(username, password) {
    await delay(2000);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, {
        username,
        password
    });
    return res.data;
}

async function forgetPassword(username) {
    await delay(2000);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/forget-password`, {
        username
    })
    return res.data;
}

export const identityService = {
    authMe,
    register,
    login,
    forgetPassword
}
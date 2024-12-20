
import axiosJWT from "../../utils/axiosJwtInstance";


async function getAccountSuggest() {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/suggest`);
    return res.data;
}

async function getAccountByNickName(nickname) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/get/${nickname}`);
    return res.data;
}


async function findAccountByP(q, page, limit) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/search`, {
        params: {
            q,
            page,
            limit,
        }
    });
    return res.data;
}

async function UpdateAccount(acc_id, data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/accounts/update/${acc_id}`, data);
    return res.data;
}



export const accountService = {
    getAccountSuggest,
    getAccountByNickName,
    findAccountByP,
    UpdateAccount
}
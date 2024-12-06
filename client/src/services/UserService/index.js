import axiosJWT from "../../utils/axiosJwtInstance";


async function updateInfor(acc_id, data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/accounts/update/${acc_id}`, data);
    return res.data;
}


export const userService = {
    updateInfor
}
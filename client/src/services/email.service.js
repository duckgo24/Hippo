import axios from 'axios'

function SendMail(username) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/forget-password`, {
                username
            })
            console.log(res.data);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
}

export default SendMail;
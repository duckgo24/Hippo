import axios from 'axios'

function SendMail(username) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
}

export default SendMail;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const accountSlice = createSlice({
    name: 'account',
    initialState: {
        status: 'idle',
        data: {
            account: {
                username: '',
                password: '',
                role: '',
                nickname: ``,
                avatar: '',
                status: '',
                num_posts: 0,
                num_followers: 0,
                num_following: 0,
                bio: '',
                list_friend: '',
            },
            token: '',
        }
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder

            // Xác thực người dùng
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.account = action.payload?.account;
                state.data.token = action.payload?.access_token;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'failed';
            })

            //Login
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.account = action?.payload.account;
                state.data.token = action?.payload.access_token;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
            })

            //Đăng ký
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.account = action.payload.account;
                state.data.token = action?.payload.access_token;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed';
            });
    }
});


export const { getPassword } = accountSlice.actions;

export default accountSlice.reducer;


const delay = (ms) => new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
})

const fetchAuthMe = createAsyncThunk('/account/me', async (token) => {
    await delay(1000);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/account/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});

const fetchRegister = createAsyncThunk('/account/register', async (data) => {
    await delay(1000);

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/register`, data);
    return res.data;
});

const fetchLogin = createAsyncThunk('/account/login', async (data) => {
    await delay(1000);

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, data, {
        withCredentials: true,
    });
    return res.data;
});


const fetchForgetPassword = () => {

}


export { fetchAuthMe, fetchRegister, fetchLogin, fetchForgetPassword };

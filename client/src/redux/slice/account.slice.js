import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosJWT from "../../utils/axiosJwtInstance";



const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAuthMe = createAsyncThunk('account/me', async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/account/me`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchRegister = createAsyncThunk('account/register', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/register`, data);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchLogin = createAsyncThunk('account/login', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, data, {
            withCredentials: true,
        });
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});


const fetchForgetPassword = createAsyncThunk('account/forget-password', async (email, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/account/forget-password`, {
            username: email
        })
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const resetStatusIdle = createAsyncThunk('account/resetStatusIdle', async (_, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


// Slice
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        status: 'idle',
        data: {
            account: {
                username: '',
                password: '',
                role: '',
                nickname: '',
                avatar: '',
                status: '',
                num_posts: 0,
                num_followers: 0,
                num_following: 0,
                bio: '',
                list_friend: '',
            },
            token: '',
        },
    },
    reducers: {
        setIdle(state) {
            state.status = 'idle';
        },
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

            // Đăng nhập
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

            // Đăng ký
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
            })

            //Quên mật khẩu
            .addCase(fetchForgetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForgetPassword.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(fetchForgetPassword.rejected, (state) => {
                state.status = 'failed';
            })

            //Reset status
            .addCase(resetStatusIdle.fulfilled, (state) => {
                state.status = 'idle';
            })
    },
});


export const { setIdle } = accountSlice.actions;
export default accountSlice.reducer;


export { fetchAuthMe, fetchRegister, fetchLogin, fetchForgetPassword };

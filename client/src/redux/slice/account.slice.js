import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosJWT from "../../utils/axiosJwtInstance";



// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAuthMe = createAsyncThunk('accounts/me', async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/auth/me`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchRegister = createAsyncThunk('accounts/register', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, data);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchLogin = createAsyncThunk('accounts/login', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, data, {
            withCredentials: true,
        });
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});


const fetchForgetPassword = createAsyncThunk('accounts/forget-password', async (email, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/forget-password`, {
            username: email
        })
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchGetAllAccounts = createAsyncThunk('accounts/all', async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/all`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchSearchAccounts = createAsyncThunk('accounts/search', async (p, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/search?q=${encodeURIComponent(p)}`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const resetStatusIdle = createAsyncThunk('resetStatusIdle', async (_, { }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


// Slice
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        my_account: [],
        followers: [],
        following: [],
        search_accounts: [],
        status_account: 'idle',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Xác thực người dùng
            .addCase(fetchAuthMe.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.my_account = action.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status_account = 'failed';
            })

            // Đăng nhập
            .addCase(fetchLogin.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.my_account = action?.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status_account = 'failed';
            })

            // Đăng ký
            .addCase(fetchRegister.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.my_account = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status_account = 'failed';
            })

            //Quên mật khẩu
            .addCase(fetchForgetPassword.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchForgetPassword.fulfilled, (state) => {
                state.status_account = 'succeeded';
            })
            .addCase(fetchForgetPassword.rejected, (state) => {
                state.status_account = 'failed';
            })

            //Lấy tất cả account
            .addCase(fetchGetAllAccounts.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchGetAllAccounts.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.accounts = action.payload;
            })
            .addCase(fetchGetAllAccounts.rejected, (state) => {
                state.status_account = 'failed';
            })

            //Tìm kiếm account
            .addCase(fetchSearchAccounts.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchSearchAccounts.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.accounts = action.payload;
            })
            .addCase(fetchSearchAccounts.rejected, (state) => {
                state.status_account = 'failed';
            })

            //Reset status
            .addCase(resetStatusIdle.fulfilled, (state) => {
                state.status_account = 'idle';
            })
    },
});


export const { setIdle } = accountSlice.actions;
export default accountSlice.reducer;


export {
    fetchAuthMe, fetchRegister, fetchLogin,
    fetchForgetPassword, fetchGetAllAccounts, fetchSearchAccounts
};

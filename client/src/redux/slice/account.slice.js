import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";


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
        await delay(2000);
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
        await delay(2000);
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
        await delay(2000);
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
        await delay(1000);
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/search?q=${encodeURIComponent(p)}`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response.data);
    }
});

const fetchSuggestAccounts = createAsyncThunk('accounts/suggest', async (_, { rejectWithValue, dispatch }) => {
    try {
        // await delay(2000);
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/accounts/suggest`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchUpdateAccount = createAsyncThunk('accounts/update', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { acc_id } = data;
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/accounts/update/${acc_id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
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
        filter_accounts: [],
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
                state.filter_accounts = action.payload;
            })
            .addCase(fetchGetAllAccounts.rejected, (state) => {
                state.status_account = 'failed';
                state.filter_accounts = [];
            })

            //Gợi ý account
            .addCase(fetchSuggestAccounts.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchSuggestAccounts.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.filter_accounts = action.payload;
            })
            .addCase(fetchSuggestAccounts.rejected, (state) => {
                state.status_account = 'failed';
                state.filter_accounts = [];
            })

            //Tìm kiếm account
            .addCase(fetchSearchAccounts.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchSearchAccounts.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.filter_accounts = action.payload;
            })
            .addCase(fetchSearchAccounts.rejected, (state) => {
                state.status_account = 'failed';
                state.filter_accounts = [];
            })

            //Cập nhật account
            .addCase(fetchUpdateAccount.pending, (state) => {
                state.status_account = 'loading';
            })
            .addCase(fetchUpdateAccount.fulfilled, (state, action) => {
                state.status_account = 'succeeded';
                state.my_account = {
                    ...state.my_account,
                    ...action.payload
                };
            })
            .addCase(fetchUpdateAccount.rejected, (state) => {
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
    fetchForgetPassword, fetchGetAllAccounts, fetchSearchAccounts,
    fetchSuggestAccounts, fetchUpdateAccount
};

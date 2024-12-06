import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";


const fetchGetAllNotify = createAsyncThunk('notify/get-all-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/notify/get-all-notify`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const fetchCreateNotify = createAsyncThunk('notify/create-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/notify/create-notify`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

const fetchUpdateNotify = createAsyncThunk('notify/update-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { notify_id } = data;
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/notify/update-notify/${notify_id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});


const fetchDeleteNotify = createAsyncThunk('notify/del-notify', async (notify_id, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/notify/del-notify/${notify_id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

const fetchDeleteNotify2 = createAsyncThunk('notify/del-notify-2', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/notify/del-notify-2`, {
            data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

const resetStatusIdle = createAsyncThunk('notify/reset_status', async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});




const notifySlice = createSlice({
    name: 'notify',
    initialState: {
        notifies: [],
        is_loading_notify: false,

    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            // Get all notify
            .addCase(fetchGetAllNotify.pending, (state, action) => {
                state.is_loading_notify = true;
            })
            .addCase(fetchGetAllNotify.fulfilled, (state, action) => {
                state.is_loading_notify = false;
                state.notifies = action.payload;
            })
            .addCase(fetchGetAllNotify.rejected, (state) => {
                state.is_loading_notify = false;
                state.notifies = [];
            })

            .addCase(fetchCreateNotify.fulfilled, (state, action) => {

                state.notifies.push(action.payload);
            })

            .addCase(fetchDeleteNotify.fulfilled, (state, action) => {
                state.notifies = state.notifies.filter(notify => notify.notify_id !== action.payload.notify_id);
            })

            .addCase(fetchDeleteNotify2.fulfilled, (state, action) => {
                state.notifies = state.notifies.filter(notify => notify.notify_id !== action.payload.notify_id);
            });


    },
});

export default notifySlice.reducer;

export {
    fetchGetAllNotify, fetchCreateNotify, fetchDeleteNotify,
    fetchUpdateNotify, fetchDeleteNotify2
};
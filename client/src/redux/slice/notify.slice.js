import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";


const fetchGetAllNotify = createAsyncThunk('notify/get-all-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/notify/get-all-notify`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle);
    }
});

const fetchCreateNotify = createAsyncThunk('notify/create-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/notify/create-notify`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle);
    }
});

const fetchUpdateNotify = createAsyncThunk('notify/update-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { notify_id } = data;
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/notify/update-notify/${notify_id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle);
    }
});


const fetchDeleteNotify = createAsyncThunk('notify/del-notify', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { notify_id } = data;
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/notify/del-notify/${notify_id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle);
    }
});

const resetStatusIdle = createAsyncThunk('notify/reset_status', async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});




const notifySlice = createSlice({
    name: 'notify',
    initialState: {
        notifies: [],
        status_notify: 'idle',
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            // Get all notify
            .addCase(fetchGetAllNotify.pending, (state, action) => {
                state.status_notify = 'loading';
            })
            .addCase(fetchGetAllNotify.fulfilled, (state, action) => {
                state.status_notify = 'succeeded';
                state.notifies = action.payload;
            })
            .addCase(fetchGetAllNotify.rejected, (state) => {
                state.status_notify = 'failed';
                state.notifies = [];
            })


            //Create notify
            .addCase(fetchCreateNotify.pending, (state, action) => {
                state.status_notify = 'loading';
            })
            .addCase(fetchCreateNotify.fulfilled, (state, action) => {
                state.status_notify = 'succeeded';
                state.notifies.push(action.payload);
            })
            .addCase(fetchCreateNotify.rejected, (state) => {
                state.status_notify = 'failed';
            })

            //Delete notify
            .addCase(fetchDeleteNotify.pending, (state, action) => {
                state.status_notify = 'loading';
            })
            .addCase(fetchDeleteNotify.fulfilled, (state, action) => {
                state.status_notify = 'succeeded';
                state.notifies = state.notifies.filter(notify => notify.notify_id !== action.payload.notify_id);
            })
            .addCase(fetchDeleteNotify.rejected, (state) => {
                state.status_notify = 'failed';
            })
    },
});

export default notifySlice.reducer;

export { fetchGetAllNotify, fetchCreateNotify, fetchDeleteNotify, fetchUpdateNotify };
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";

const fetchGetAllMessages = createAsyncThunk('messages/get-messages', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/messages/get-messages`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchCreateMessage = createAsyncThunk('messages/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/messages/create`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
    }
});



const resetStatusIdle = createAsyncThunk('messages/reset_status', async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});

export { fetchGetAllMessages, fetchCreateMessage };

const roomMessageSlice = createSlice({
    name: 'roomMessage',
    initialState: {
        room_messages: null,
        status_message: 'idle',
        error_message: null
    },
    extraReducers: builder => {
        builder
            //Lay tat ca tin nhan
            .addCase(fetchGetAllMessages.pending, (state) => {
                state.status_message = 'loading';
            })
            .addCase(fetchGetAllMessages.fulfilled, (state, action) => {
                state.room_messages = action.payload;
                state.status_message = 'succeeded';
            })
            .addCase(fetchGetAllMessages.rejected, (state, action) => {
                state.status_message = 'failed';
                state.error_message = action.payload;
            })

            //Them tin nhan
            // .addCase(fetchCreateMessage.pending, (state) => {
            //     state.status_message = 'loading';
            // })
            // .addCase(fetchCreateMessage.fulfilled, (state, action) => {
            //     state.room_messages.room_messages.push(action.payload);
            //     state.status_message = 'succeeded';
            // })
            // .addCase(fetchCreateMessage.rejected, (state, action) => {
            //     state.status_message = 'failed';
            //     state.error_message = action.payload;
            // })

            //Reset status
            .addCase(resetStatusIdle.fulfilled, (state) => {
                state.status_message = 'idle';
            })
    }
});

export default roomMessageSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";

const fetchGetAllMessages = createAsyncThunk('messages/get-messages', async (room_id, { rejectWithValue, dispatch }) => {
    try {
        await delay(1000);
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/messages/${room_id}/get-messages`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



export { fetchGetAllMessages };

const roomMessageSlice = createSlice({
    name: 'roomMessage',
    initialState: {
        room_list_message: null,
        is_loading_message: false,
        error_message: null
    },
    reducers: {
        setCreateMessage: (state, action) => {
            state.room_list_message.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetAllMessages.pending, (state) => {
                state.is_loading_message = true;
            })
            .addCase(fetchGetAllMessages.fulfilled, (state, action) => {
                state.room_list_message = action.payload;
                state.is_loading_message = false;
            })
            .addCase(fetchGetAllMessages.rejected, (state, action) => {
                state.is_loading_message = false;
                state.room_list_message = [];
            })

    }
});

export const { 
    setMessages,
    setCreateMessage 
} = roomMessageSlice.actions;

export default roomMessageSlice.reducer;
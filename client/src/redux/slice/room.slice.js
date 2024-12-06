import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import delay from "../../utils/delay";

const fetchGetAllRoom = createAsyncThunk('rooms/get-rooms', async (acc_id, { rejectWithValue, dispatch }) => {
    try {
        await delay(1000);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/get-rooms/${acc_id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const fetchCreateRoom = createAsyncThunk('rooms/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/create`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const fetchGetRoom = createAsyncThunk('rooms/find', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/find`, {
            param: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const fetchDeleteRoom = createAsyncThunk('rooms/delete', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = axios.post(`${process.env.REACT_APP_API_URL}/rooms/delete`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



const resetStatusIdle = createAsyncThunk('rooms/reset_status', async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});

export { fetchGetAllRoom, fetchGetRoom, fetchCreateRoom, fetchDeleteRoom };


const roomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        currentRoom: null,
        is_loading_room: false,
    },
    reducers: {
        setCreateRoom: (state, action) => {
            state.rooms.push(action.payload);
        },
        setLastMessageInRoom: (state, action) => {
            const { room_id, message } = action.payload;
            const index = state.rooms.findIndex((room) => room.room_id === room_id);
            state.rooms[index].last_message = message;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchGetAllRoom.pending, (state) => {
                state.is_loading_room = true;
            })
            .addCase(fetchGetAllRoom.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.is_loading_room = false;
            })
            .addCase(fetchGetAllRoom.rejected, (state) => {
                state.is_loading_room = false;
                state.rooms = [];
            })

            // Tim kiem room theo id
            .addCase(fetchGetRoom.pending, (state) => {
                state.status_room = "loading";
            })
            .addCase(fetchGetRoom.fulfilled, (state, action) => {
                state.currentRoom = action.payload;
                state.status_room = "succeeded";
            })
            .addCase(fetchGetRoom.rejected, (state) => {
                state.status_room = "failed";
            })

            // Xoa room
            .addCase(fetchDeleteRoom.pending, (state) => {
                state.status_room = "loading";
            })
            .addCase(fetchDeleteRoom.fulfilled, (state) => {
                state.status_room = "succeeded";
            })
            .addCase(fetchDeleteRoom.rejected, (state) => {
                state.status_room = "failed";
            })
});

export const {
    setCreateRoom,
    setLastMessageInRoom

} = roomSlice.actions;

export default roomSlice.reducer;



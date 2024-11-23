import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchGetAllRoom = createAsyncThunk('rooms/get-rooms', async (data, { rejectWithValue, dispatch}) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/get-rooms`, {
            params: data
        });
        
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
    }
});


const fetchCreateRoom = createAsyncThunk('rooms/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/create`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
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
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchDeleteRoom = createAsyncThunk('rooms/delete', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = axios.post(`${process.env.REACT_APP_API_URL}/rooms/delete`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(resetStatusIdle());
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
        status_room: "idle"
    },
    extraReducers: builder =>
        builder
            // Lay tat ca cac room
            .addCase(fetchGetAllRoom.pending, (state) => {
                state.status_room = "loading";
            })
            .addCase(fetchGetAllRoom.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.status_room = "succeeded";
            })
            .addCase(fetchGetAllRoom.rejected, (state) => {
                state.status_room = "failed";
                state.rooms = [];
            })

            // Tao room moi
            .addCase(fetchCreateRoom.pending, (state) => {
                state.status_room = "loading";
            })
            .addCase(fetchCreateRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
                state.status_room = "succeeded";
            })
            .addCase(fetchCreateRoom.rejected, (state) => {
                state.status_room = "failed";
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

            // Reset status to idle
            .addCase(resetStatusIdle.fulfilled, (state) => {
                state.status_room = "idle";
            })
});

export default roomSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import delay from '../../utils/delay';
import axiosJWT from '../../utils/axiosJwtInstance';

const fetchGetAllRoom = createAsyncThunk('rooms/get-rooms', async (acc_id, { rejectWithValue, dispatch }) => {
      try {
            await delay(1000);
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/rooms/get-rooms/${acc_id}`);
            return res.data;
      } catch (error) {
            return rejectWithValue(error.response.data);
      }
});

const fetchGetAllRoomGroup = createAsyncThunk('rooms/get-rooms-group', async (acc_id, { rejectWithValue, dispatch }) => {
      try {
            await delay(1000);
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/rooms/get-rooms-group/${acc_id}`);
            return res.data;
      } catch (error) {
            return rejectWithValue(error.response.data);
      }
});

const fetchCreateRoom = createAsyncThunk('rooms/create', async (data, { rejectWithValue, dispatch }) => {
      try {
            const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/rooms/create`, data);
            return res.data;
      } catch (error) {
            return rejectWithValue(error.response.data);
      }
});

const fetchGetRoom = createAsyncThunk('rooms/find', async (data, { rejectWithValue, dispatch }) => {
      try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/find`, {
                  param: data,
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

export { fetchGetAllRoom, fetchGetRoom, fetchGetAllRoomGroup, fetchCreateRoom, fetchDeleteRoom };

const roomSlice = createSlice({
      name: 'room',
      initialState: {
            rooms: [],
            rooms_group: [],
            current_room: null,
            current_room_group: null,
            is_loading_room: false,
      },
      reducers: {
            setCreateRoom: (state, action) => {
                  state.rooms.push(action.payload);
            },
            setCurrentRoom: (state, action) => {
                  state.current_room = action.payload;
            },
            setLastMessageInRoom: (state, action) => {
                  const { room_id, message } = action.payload;
                  const index = state.rooms.findIndex((room) => room.room_id === room_id);
                  state.rooms[index].last_message = message;
            },

            setCreateRoomGroup: (state, action) => {
                  state.rooms_group.push(action.payload);
            },

            setAddUserToRoom: (state, action) => {
                  const { room_id, user } = action.payload;
                  const index = state.rooms_group.findIndex((room) => room.room_id === room_id);
                  const idxUser = state.rooms_group[index]?.participants.findIndex((u) => u.acc_id === user.acc_id);
                  if (idxUser === -1) {
                        state.rooms_group[index].participants.push(user);
                  } else {
                        state.rooms_group[index].participants[idxUser] = user;
                  }

                  const idxUser2 = state.current_room_group.participants.findIndex((u) => u.acc_id === user.acc_id);
                  if (idxUser2 === -1) {
                        state.current_room_group.participants.push(user);
                  } else {
                        state.current_room_group.participants[idxUser2] = user;
                  }
            },

            setCurrentRoomGroup: (state, action) => {
                  state.current_room_group = action.payload;
            },

            setDeleteUserFromRoom: (state, action) => {
                  const { room_id, user } = action.payload;
                  const index = state.rooms_group.findIndex((room) => room.room_id === room_id);
                  const userIndex = state.rooms_group[index]?.participants.findIndex((u) => u.acc_id === user.acc_id);
                  state.rooms_group[index].participants[userIndex] = user;

                  const idx2 = state.current_room_group.participants.findIndex((u) => u.acc_id === user.acc_id);
                  state.current_room_group.participants[idx2] = user;
            },
      },
      extraReducers: (builder) =>
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

                  .addCase(fetchGetAllRoomGroup.pending, (state) => {
                        state.is_loading_room = true;
                  })
                  .addCase(fetchGetAllRoomGroup.fulfilled, (state, action) => {
                        state.rooms_group = action.payload;
                        state.is_loading_room = false;
                  })
                  .addCase(fetchGetAllRoomGroup.rejected, (state) => {
                        state.is_loading_room = false;
                        state.rooms_group = [];
                  })

                  // Tao room
                  .addCase(fetchCreateRoom.fulfilled, (state, action) => {
                        state.rooms.push(action.payload);
                  })

                  // Tim kiem room theo id
                  .addCase(fetchGetRoom.pending, (state) => {
                        state.status_room = 'loading';
                  })
                  .addCase(fetchGetRoom.fulfilled, (state, action) => {
                        state.currentRoom = action.payload;
                        state.status_room = 'succeeded';
                  })
                  .addCase(fetchGetRoom.rejected, (state) => {
                        state.status_room = 'failed';
                  })

                  // Xoa room
                  .addCase(fetchDeleteRoom.pending, (state) => {
                        state.status_room = 'loading';
                  })
                  .addCase(fetchDeleteRoom.fulfilled, (state) => {
                        state.status_room = 'succeeded';
                  })
                  .addCase(fetchDeleteRoom.rejected, (state) => {
                        state.status_room = 'failed';
                  }),
});

export const { setCurrentRoomGroup, setCurrentRoom, setCreateRoom, setLastMessageInRoom, setCreateRoomGroup, setAddUserToRoom, setDeleteUserFromRoom } = roomSlice.actions;

export default roomSlice.reducer;

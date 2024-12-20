import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosJWT from '../../utils/axiosJwtInstance';
import delay from '../../utils/delay';

const fetchGetAllMessages = createAsyncThunk('messages/get-messages', async (room_id, { rejectWithValue, dispatch }) => {
      try {
            await delay(1000);
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/messages/${room_id}/get-messages`);
            return res.data;
      } catch (error) {
            return rejectWithValue(error.response.data);
      }
});

const fetchGetAllMessageGroup = createAsyncThunk('messages/get-messages-group', async ({ acc_id, room_id }, { rejectWithValue }) => {
      try {
            await delay(1000);
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/messages/get-messages-group`, {
                  params: {
                        room_id,
                        acc_id,
                  },
            });
            return res.data;
      } catch (error) {
            return rejectWithValue(error.response.data);
      }
});

export { fetchGetAllMessages, fetchGetAllMessageGroup };

const roomMessageSlice = createSlice({
      name: 'roomMessage',
      initialState: {
            room_list_message: null,
            room_message_group: null,
            is_loading_message: false,
            error_message: null,
      },
      reducers: {
            setCreateMessage: (state, action) => {
                  state.room_list_message.push(action.payload);
            },
            setCreateMessageGroup: (state, action) => {
                  state.room_message_group.push(action.payload);
            },
            setUpdateMessage: (state, action) => {
                  const { message_id, data } = action.payload;
                  const index = state.room_list_message.findIndex((message) => message.message_id === message_id);
                  if (index !== -1) {
                        state.room_list_message[index] = { ...state.room_list_message[index], ...data };
                  }
            },
            setUpdateMessageGroup: (state, action) => {
                  const { message_id, data } = action.payload;
                  const index = state.room_message_group.findIndex((message) => message.message_id === message_id);
                  if (index !== -1) {
                        state.room_message_group[index] = { ...state.room_message_group[index], ...data };
                  }
            },
      },
      extraReducers: (builder) => {
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

                  .addCase(fetchGetAllMessageGroup.pending, (state) => {
                        state.is_loading_message = true;
                  })
                  .addCase(fetchGetAllMessageGroup.fulfilled, (state, action) => {
                        state.room_message_group = action.payload;
                        state.is_loading_message = false;
                  })
                  .addCase(fetchGetAllMessageGroup.rejected, (state, action) => {
                        state.is_loading_message = false;
                        state.room_message_group = [];
                  });
      },
});

export const { setCreateMessage, setCreateMessageGroup, setUpdateMessage, setUpdateMessageGroup } = roomMessageSlice.actions;

export default roomMessageSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import axios from "axios";


const fetchGetAllRequestFriend = createAsyncThunk('request-friends/all', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/request-friends/all`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
})

const fetchCreateRequestFriend = createAsyncThunk('request-friends/create', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/request-friends/create`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchDeleteRequestFriend = createAsyncThunk('request-friends/delete', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/request-friends/delete`, {
            params: data
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchRefuseRequestFriend = createAsyncThunk('request-friends/refuse', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/request-friends/refuse`, {
            params: data
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
})

const fetchFindRequestFriendWithSender = createAsyncThunk('request-friends/find-with-sender', async (data, { dispatch, rejectWithValue }) => {
    try {
     
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/request-friends/find-with-sender`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchFindRequestFriendWithReceiver = createAsyncThunk('request-friends/find-with-receiver', async (data, { dispatch, rejectWithValue }) => {
    try {
     
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/request-friends/find-with-receiver`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});




const resetStatusIdle = createAsyncThunk('request-friends/reset-statsus', async (_, { }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


export {
    fetchGetAllRequestFriend, fetchCreateRequestFriend, fetchDeleteRequestFriend,
    fetchFindRequestFriendWithReceiver,fetchFindRequestFriendWithSender,
    fetchRefuseRequestFriend
};



const requestFriendSlice = createSlice({
    name: 'requestFriend',
    initialState: {
        requestFriends: [],
        filter_request_friend: [],
        get_request_friend_sender: {},
        get_request_friend_receiver: {},
        status_request_friend: 'idle',
    },
    extraReducers: builder => {
        builder
            //Lay tat ca request
            .addCase(fetchGetAllRequestFriend.pending, (state, action) => {
                state.status_request_friend = 'loading';

            })
            .addCase(fetchGetAllRequestFriend.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.requestFriends = action.payload;
            })
            .addCase(fetchGetAllRequestFriend.rejected, (state, action) => {
                state.status_request_friend = 'failed';
            })

            //Tao request
            .addCase(fetchCreateRequestFriend.pending, (state, action) => {
                state.status_request_friend = 'loading';
            })
            .addCase(fetchCreateRequestFriend.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.requestFriends = [...state.requestFriends, action.payload];
                state.get_request_friend_sender = action.payload;
            })
            .addCase(fetchCreateRequestFriend.rejected, (state, action) => {
                state.status_request_friend = 'failed';
            })

            //Xoa request
            .addCase(fetchDeleteRequestFriend.pending, (state, action) => {
                state.status_request_friend = 'loading';
            })
            .addCase(fetchDeleteRequestFriend.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.requestFriends = state.requestFriends.filter(request => 
                    request.sender_id !== action.payload?.acc_id && 
                    request.receiver_id !== action.payload?.receiver_id
                );
                state.get_request_friend_sender = {};
                state.get_request_friend_receiver = {};
            })
            .addCase(fetchDeleteRequestFriend.rejected, (state, action) => {
                state.status_request_friend = 'failed';
            })

            //Tu choi request
            .addCase(fetchRefuseRequestFriend.pending, (state, action) => {
                state.status_request_friend = 'loading';
            })
            .addCase(fetchRefuseRequestFriend.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.get_request_friend_receiver = {};
                state.get_request_friend_sender = {};
            })
            .addCase(fetchRefuseRequestFriend.rejected, (state, action) => {
                state.status_request_friend = 'failed';
            })


            //Tim request với người gửi
            .addCase(fetchFindRequestFriendWithSender.pending, (state, action) => {
                state.status_request_friend = 'loading';
            })
            .addCase(fetchFindRequestFriendWithSender.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.get_request_friend_sender = action.payload;
            })
            .addCase(fetchFindRequestFriendWithSender.rejected, (state, action) => {
                state.status_request_friend = 'failed';
                state.get_request_friend_sender = {};
            })

            //Tim request với người nhận
            .addCase(fetchFindRequestFriendWithReceiver.pending, (state, action) => {
                state.status_request_friend = 'loading';
            })
            .addCase(fetchFindRequestFriendWithReceiver.fulfilled, (state, action) => {
                state.status_request_friend = 'success';
                state.get_request_friend_receiver = action.payload;
            })
            .addCase(fetchFindRequestFriendWithReceiver.rejected, (state, action) => {
                state.status_request_friend = 'failed';
                state.get_request_friend_receiver = {};
            })

            .addCase(resetStatusIdle.fulfilled, (state, action) => {
                state.status_request_friend = 'idle';
            })
    }
})

export default requestFriendSlice.reducer;

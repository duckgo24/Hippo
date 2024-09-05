import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";


const fetchGetAllFriend = createAsyncThunk('friend/fetchGetAllFriend', async (data, { dispatch, rejectWithValue }) => {
    try {
        const { acc_id } = data;
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/friend/get-all-friend`, {
            params: {
                acc_id
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
})

const fetchAddFriend = createAsyncThunk('friend/AddFriend', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/friend/add-friend`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchDeleteFriend = createAsyncThunk('friend/fetchDeleteFriend', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/friend/delete-friend`, {
            params: {
                acc_id: data.acc_id,
                friend_id: data.friend_id
            }
        });
        console.log(res.data);
        
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
})

const fetchFindFriend = createAsyncThunk('friend/find', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/friend/find`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});


const fetchUpdateStatusFriend = createAsyncThunk('friend/fetchUpdateStatusFriend', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/friend/update-status-friend`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchCheckFriend = createAsyncThunk('friend/fetchCheckFriend', async (data, {dispatch, rejectWithValue}) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/friend/check-friend`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});



const resetStatusIdle = createAsyncThunk('friend/reset-status', async (_, { }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


export {
    fetchGetAllFriend, fetchAddFriend, fetchDeleteFriend,
    fetchFindFriend,fetchUpdateStatusFriend, fetchCheckFriend
};



const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
        filter_friend: [],
        get_friend: {},
        status_friend: 'idle',
    },
    extraReducers: builder => {
        builder
        //Lấy tất cả bạn bè
        .addCase(fetchGetAllFriend.pending, (state, action) => {
            state.status_friend = 'loading';
        })
        .addCase(fetchGetAllFriend.fulfilled, (state, action) => {
            state.friends = action.payload;
            state.status_friend = 'success';
        })
        .addCase(fetchGetAllFriend.rejected, (state, action) => {
            state.status_friend = 'failed';
        })

        //Thêm bạn bè
        .addCase(fetchAddFriend.pending, (state, action) => {
            state.status_friend = 'loading';
        })
        .addCase(fetchAddFriend.fulfilled, (state, action) => {
            state.status_friend = 'success';
            state.friends.push(action.payload);
            state.get_friend = action.payload;
        })
        .addCase(fetchAddFriend.rejected, (state, action) => {
            state.status_friend = 'failed';
        })

        // Xóa bạn bè
        .addCase(fetchDeleteFriend.pending, (state, action) => {
            state.status_friend = 'loading';
        })
        .addCase(fetchDeleteFriend.fulfilled, (state, action) => {
            state.status_friend = 'success';
            state.friends = state.friends.filter(friend => 
                friend.acc_id !== action.payload?.acc_id &&
                friend.friend_id !== action?.payload?.friend_id
            )
            state.get_friend = {}
        })
        .addCase(fetchDeleteFriend.rejected, (state, action) => {
            state.status_friend = 'failed';
        })

        //Cập nhật trạng thái bạn bè
        .addCase(fetchUpdateStatusFriend.pending, (state, action) => {
            state.status_friend = 'loading';
        })
        .addCase(fetchUpdateStatusFriend.fulfilled, (state, action) => {
            state.status_friend = 'success';
            const friend = state.friends.find(friend => friend.friend_id === action.payload.friend_id);
            if (friend) {
                friend.status = action.payload.status;
            }
        })
        .addCase(fetchUpdateStatusFriend.rejected, (state, action) => {
            state.status_friend = 'failed';
        })

        //Check bạn bè
        .addCase(fetchCheckFriend.pending, (state, action) => {
            state.status_friend = 'loading'
        })
        .addCase(fetchCheckFriend.fulfilled, (state, action) => {
            state.status_friend = 'success';
            state.get_friend = action.payload;     
        })
        .addCase(fetchCheckFriend.rejected , (state, action) => {
            state.status_friend = 'failed'
            state.get_friend = {};
        })


        .addCase(resetStatusIdle.fulfilled, (state, action) => {
            state.status_friend = 'idle';
        })
    }
})

export default friendSlice.reducer;

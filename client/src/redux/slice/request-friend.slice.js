import { createSlice } from "@reduxjs/toolkit";

const requestFriendSlice = createSlice({
    name: 'requestFriend',
    initialState: {
        requestFriends: [],
        filter_request_friend: [],
        get_request_friend_sender: {},
        get_request_friend_receiver: {},
        status_request_friend: 'idle',
    },
    reducers: {
        setCreateRequestFriend: (state, action) => {
            state.requestFriends = [...state.requestFriends, action.payload];
        },
        setGetRequestFriendSender: (state, action) => {
            state.get_request_friend_sender = action.payload;
        },
        setGetRequestFriendReceiver: (state, action) => {
            state.get_request_friend_receiver = action.payload;
        }
    },
});

export const {
    setCreateRequestFriend, setGetRequestFriendSender, setGetRequestFriendReceiver
} = requestFriendSlice.actions;

export default requestFriendSlice.reducer;

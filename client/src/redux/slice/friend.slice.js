import { createSlice } from "@reduxjs/toolkit";


const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
        filter_friend: [],
        get_friend: {},
        status_friend: 'idle',
    },
    reducers: {
        setListFriend: (state, action) => {
            state.friends = action.payload
        },
        setFilterFriend: (state, action) => {
            state.filter_friend = action.payload;
        },
        setAddFriend: (state, action) => {
            state.friends.push(action.payload);
            state.get_friend = action.payload;
        },
        setGetFriend: (state, action) => {
            state.get_friend = action.payload;
        }
    },
});

export const {
    setListFriend,
    setFilterFriend,
    setGetFriend,
    setAddFriend
} = friendSlice.actions;

export default friendSlice.reducer;

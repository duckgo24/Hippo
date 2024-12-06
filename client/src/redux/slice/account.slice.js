import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        my_account: [],
        followers: [],
        following: [],
        focus_account: null,
        filter_accounts: [],
        suggest_accounts: [],
    },
    reducers: {
        setSuggestAccounts: (state, action) => {
            state.suggest_accounts = action.payload;
        },
        setAuthMe: (state, action) => {
            state.my_account = action.payload;
        },
        setMyAccount: (state, action) => {
            state.my_account = action.payload;
        },
        setFitlerAccounts: (state, action) => {
            state.filter_accounts = action.payload;
        },
        setUpdateMyAccount: (state, action) => {
            state.my_account = {
                ...state.my_account,
                ...action.payload
            };
        }
    }
});


export const {
    setAuthMe, setUpdateMyAccount, setMyAccount,
    setFitlerAccounts, setSuggestAccounts
} = accountSlice.actions;

export default accountSlice.reducer;


import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './slice/account.slice'
import postReducer from './slice/post.slice'
import likeReducer from './slice/like.slice'

const rootReducer = {
    account: accountReducer,
    post: postReducer,
    like: likeReducer,
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
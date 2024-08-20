import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './slice/account.slice'
import postReducer from './slice/post.slice'
import likeReducer from './slice/like.slice'
import commentReducer from './slice/comment.slice'
import replyCommentReducer from './slice/reply-comment.slide'

const rootReducer = {
    account: accountReducer,
    post: postReducer,
    like: likeReducer,
    comment: commentReducer,
    replyComment: replyCommentReducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
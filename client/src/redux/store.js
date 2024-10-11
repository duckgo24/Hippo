
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import accountReducer from './slice/account.slice';
import postReducer from './slice/post.slice';
import videoReducer from './slice/video.slice';
import likeReducer from './slice/like.slice';
import commentReducer from './slice/comment.slice';
import replyCommentReducer from './slice/reply-comment.slide';
import friendReducer from './slice/friend.slice';
import requestFriendReducer from './slice/request-friend.slice';
import roomReducer from './slice/room.slice';
import roomMessageReducer from './slice/room-message.slice';

import persistConfig from './persistConfig';

const rootReducer = combineReducers({
  account: accountReducer,
  post: postReducer,
  video: videoReducer,
  like: likeReducer,
  comment: commentReducer,
  replyComment: replyCommentReducer,
  friend: friendReducer,
  requestFriend: requestFriendReducer,
  room: roomReducer,
  roomMessage: roomMessageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


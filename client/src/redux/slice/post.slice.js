import { createSlice } from '@reduxjs/toolkit';



const postSlice = createSlice({
    name: 'post',
    initialState: {
        filter_posts: [],
        posts: [],
        post: {},
        status_post: 'idle'
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        },
        setCreatePost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        setUpdatePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post?.post_id === action.payload?.post_id) {
                    return {
                        ...post,
                        ...action.payload
                    }
                }
                return post;
            });
            state.post = {
                ...state.post,
                ...action.payload
            }
        },
        setDeletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.post_id !== action.payload.post_id);
        }
    },

});

export const {
    setPosts, setPost, setCreatePost,
    setUpdatePost, setDeletePost
} = postSlice.actions;

export default postSlice.reducer;

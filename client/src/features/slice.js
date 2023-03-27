import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    posts:[],
    user:[],
    post:{},
    comments:[]
 };
  
 const slice = createSlice({
    name: "mern",
    initialState,
    reducers: {
      posts: (state,{payload}) => {
        state.posts = payload;
      },
      user:(state,{payload})=>{
        state.user=payload;
      },
      post: (state,{payload}) => {
        state.post = state.posts.find((item)=>item._id===payload);
      },
      deletePost: (state,{payload}) => {
        state.post = state.posts.filter((item)=>item._id!==payload);
      },
      deleteUser:(state)=>{
        state.user=[];
      },
      deletePosts:(state)=>{
        state.posts=[];
      }
      ,
      comments:(state,{payload})=>{
        state.comments=payload;
      },
      addComments:(state,{payload})=>{
        state.comments=state.comments.push(payload);
      }
    }
});

export const getAllPosts=(state)=>state.posts.posts;
export const getAllComments=(state)=>state.posts.comments;
export const getOnePost=(state)=>state.posts.post;
export const getUser=(state)=>state.posts.user
export const{posts,post,deletePost,user,deleteUser,deletePosts,comments,addComments}= slice.actions;
export default slice.reducer;


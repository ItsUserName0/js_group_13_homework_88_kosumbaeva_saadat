import { PostsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  fetchPostFailure,
  fetchPostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostSuccess
} from './posts.actions';

const initialState: PostsState = {
  posts: [],
  fetchLoading: false,
  fetchError: null,
  post: null,
  fetchPostLoading: false,
  fetchPostError: null,
  createLoading: false,
  createError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createPostRequest, state => ({...state, createLoading: true, createError: null})),
  on(createPostSuccess, state => ({...state, createLoading: false})),
  on(createPostFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(fetchPostRequest, state => ({...state, fetchPostLoading: true, fetchPostError: null})),
  on(fetchPostSuccess, (state, {post}) => ({...state, fetchPostLoading: false, post})),
  on(fetchPostFailure, (state, {error}) => ({...state, fetchPostLoading: false, fetchPostError: error})),
);

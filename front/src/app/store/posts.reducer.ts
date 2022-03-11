import { PostsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from './posts.actions';

const initialState: PostsState = {
  posts: [],
  fetchLoading: false,
  fetchError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
);

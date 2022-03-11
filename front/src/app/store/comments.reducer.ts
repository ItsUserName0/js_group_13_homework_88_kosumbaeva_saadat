import { createReducer, on } from '@ngrx/store';
import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';
import { CommentsState } from './types';

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(fetchCommentsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchCommentsSuccess, (state, {comments}) => ({...state, fetchLoading: false, comments})),
  on(fetchCommentsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createCommentRequest, state => ({...state, createLoading: true, createError: null})),
  on(createCommentSuccess, state => ({...state, createLoading: false})),
  on(createCommentFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
)

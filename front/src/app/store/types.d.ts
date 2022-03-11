import { LoginError, RegisterError, User } from '../models/user.model';
import { CreatePostError, Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type PostsState = {
  posts: Post[],
  fetchLoading: boolean,
  fetchError: null | string,
  post: Post | null,
  fetchPostLoading: boolean,
  fetchPostError: null | string,
  createLoading: boolean,
  createError: null | CreatePostError,
};

export type CommentsState = {
  comments: Comment[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  users: UsersState,
  posts: PostsState,
  comments: CommentsState,
};

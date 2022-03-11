import { LoginError, RegisterError, User } from '../models/user.model';
import { Post, CreatePostError } from '../models/post.model';

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
  createLoading: boolean,
  createError: null | CreatePostError,
};

export type AppState = {
  users: UsersState,
  posts: PostsState,
};

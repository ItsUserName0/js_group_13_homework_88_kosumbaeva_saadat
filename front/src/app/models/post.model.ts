import { User } from './user.model';

export interface Post {
  _id: string,
  user: User,
  title: string,
  description: null | string,
  image: null | string,
  date: Date,
}

export interface PostData {
  [key: string]: any,

  token: string,
  title: string,
  description: null | string,
  image: File | null,
}

export interface FieldError {
  message: string,
}

export interface CreatePostError {
  errors: {
    description: FieldError,
    image: FieldError,
  },
}

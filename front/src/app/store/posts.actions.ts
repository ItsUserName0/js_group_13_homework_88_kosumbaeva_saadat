import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Posts Request');
export const fetchPostsSuccess = createAction('[Posts] Posts Success', props<{ posts: Post[] }>());
export const fetchPostsFailure = createAction('[Posts] Posts Failure', props<{ error: string }>());

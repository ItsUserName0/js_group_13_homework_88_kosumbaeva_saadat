import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentsEffects {

  constructor(private actions: Actions,
              private store: Store<AppState>,
              private commentsService: CommentsService) {
  }

  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(({id}) => this.commentsService.fetchComments(id).pipe(
      map((comments: Comment[]) => fetchCommentsSuccess({comments})),
      catchError(({error}) => of(fetchCommentsFailure(error))),
    )),
  ));

  createComment = createEffect(() => this.actions.pipe(
    ofType(createCommentRequest),
    mergeMap(({commentData}) => this.commentsService.createComment(commentData).pipe(
      map(() => createCommentSuccess()),
      catchError(({error}) => of(createCommentFailure(error))),
    )),
  ));

}

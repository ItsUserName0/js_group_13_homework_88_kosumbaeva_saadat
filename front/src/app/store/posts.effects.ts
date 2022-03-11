import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
} from './posts.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class PostsEffects {
  constructor(private actions: Actions,
              private postsService: PostsService,
              private helpers: HelpersService,
              private router: Router) {
  }

  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.fetchPosts().pipe(
      map((posts) => fetchPostsSuccess({posts})),
      catchError(() => of(fetchPostsFailure({error: 'Something went wrong!'}))),
    )),
  ));

  createPost = createEffect(() => this.actions.pipe(
    ofType(createPostRequest),
    mergeMap(({postData}) => this.postsService.createPost(postData).pipe(
      map(() => createPostSuccess()),
      tap(() => this.router.navigate(['/'])),
      this.helpers.catchServerError(createPostFailure),
    ))
  ));

}

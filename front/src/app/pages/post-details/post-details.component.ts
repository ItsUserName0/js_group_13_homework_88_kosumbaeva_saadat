import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { fetchPostRequest } from '../../store/posts.actions';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.sass']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post: Observable<null | Post>;
  postSub!: Subscription;
  postData!: Post | null;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.post = store.select(state => state.posts.post);
    this.loading = store.select(state => state.posts.fetchPostLoading);
    this.error = store.select(state => state.posts.fetchPostError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const postId = params['id'];
      this.store.dispatch(fetchPostRequest({id: postId}));
    });
    this.postSub = this.post.subscribe(post => {
      if (post) {
        this.postData = post;
      }
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}

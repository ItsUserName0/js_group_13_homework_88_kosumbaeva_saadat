import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { fetchCommentsRequest } from '../../store/comments.actions';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() post!: string;

  comments: Observable<Comment[]>;
  commentsSub!: Subscription;
  commentsList!: Comment[];
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.comments = store.select(state => state.comments.comments);
    this.loading = store.select(state => state.comments.fetchLoading);
    this.error = store.select(state => state.comments.createError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCommentsRequest({id: this.post}));
    this.commentsSub = this.comments.subscribe(comments => {
      this.commentsList = comments;
    });
  }

  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }

}

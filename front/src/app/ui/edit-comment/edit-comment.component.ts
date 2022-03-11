import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createCommentRequest } from '../../store/comments.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})
export class EditCommentComponent implements OnInit, OnDestroy {
  @Input() post!: string;
  @ViewChild('f') form!: NgForm;

  user: Observable<null | User>;
  userSub!: Subscription;
  token!: string | undefined;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.token = user?.token;
      }
    });
  }

  createComment() {
    const commentData = this.form.value;
    commentData.author = this.token;
    commentData.post = this.post;
    this.store.dispatch(createCommentRequest({commentData}));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

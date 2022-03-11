import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { CreatePostError } from '../../models/post.model';
import { createPostRequest } from '../../store/posts.actions';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  user: Observable<null | User>;
  userSub!: Subscription;
  token!: string | undefined;
  loading: Observable<boolean>;
  error: Observable<null | CreatePostError>;
  errSub!: Subscription;
  errors: string[] = [];

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.posts.createLoading);
    this.error = store.select(state => state.posts.createError);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.token = user?.token;
    });
  }

  ngAfterViewInit() {
    this.errSub = this.error.subscribe(err => {
      if (err) {
        if (err.errors.description) {
          this.errors.push(err.errors.description.message);
        } else if (err.errors.image) {
          this.errors.push(err.errors.image.message);
        }
      }
    });
  }

  createPost() {
    const postData = this.form.value;
    postData.token = this.token;
    this.store.dispatch(createPostRequest({postData}));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.errSub.unsubscribe();
  }
}

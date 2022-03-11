import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ImagePipe } from './pipes/image.pipe';
import { PostsComponent } from './pages/posts/posts.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostComponent } from './ui/post/post.component';
import { CommentComponent } from './ui/comment/comment.component';
import { EditCommentComponent } from './ui/edit-comment/edit-comment.component';
import { ValidateAvailabilityDirective } from './directives/validate-availability.directive';
import { CommentsComponent } from './ui/comments/comments.component';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
    FileInputComponent,
    ImagePipe,
    PostsComponent,
    EditPostComponent,
    PostDetailsComponent,
    PostComponent,
    CommentComponent,
    EditCommentComponent,
    ValidateAvailabilityDirective,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    StoreModule.forRoot({users: usersReducer}, {metaReducers}),
    EffectsModule.forRoot([UsersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

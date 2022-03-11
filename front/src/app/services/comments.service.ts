import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comment, CommentData } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  fetchComments(id: string) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comments/${id}`);
  }

  createComment(commentData: CommentData) {
    return this.http.post(environment.apiUrl + '/comments', commentData, {headers: new HttpHeaders({'Authorization': commentData.author})});
  }

}

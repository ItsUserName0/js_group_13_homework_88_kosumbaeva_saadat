import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, PostData } from '../models/post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  fetchPosts() {
    return this.http.get<Post[]>(environment.apiUrl + '/posts');
  }

  fetchPost(id: string) {
    return this.http.get<Post[] | null>(environment.apiUrl + `/posts/${id}`).pipe(
      map(result => {
        if (!result) return null;
        return result[0];
      })
    )
  }

  createPost(postData: PostData) {
    const formData = new FormData();

    Object.keys(postData).forEach(key => {
      if (key !== null) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/posts', formData, {headers: new HttpHeaders({'Authorization': postData.token})});
  }
}

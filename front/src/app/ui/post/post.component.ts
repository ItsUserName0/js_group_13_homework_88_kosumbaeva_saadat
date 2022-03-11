import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

  getDate() {
    const date = new Date(this.post.date);
    return date.toLocaleString('kyr-KG');
  }

}

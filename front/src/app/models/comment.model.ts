export interface Comment {
  _id: string,
  author: {displayName: string},
  description: string,
  post: string,
}

export interface CommentData {
  author: string,
  description: string,
  post: string,
}

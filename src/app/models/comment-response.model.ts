export class CommentResponse {

  constructor(public id: number, public comment: Comment,
              public response: string, public username: string,
              public email: string){}
}

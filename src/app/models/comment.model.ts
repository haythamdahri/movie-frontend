export class Comment {

  constructor(public id: number, public movie: URL,
              public comment: Comment, public username: string,
              public email: string, public website: string,
              public ipAddress: string, public date: Date) {}
}

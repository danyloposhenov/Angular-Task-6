export interface IBlog {
  id: number;
  postedBy: string,
  topic: string,
  date: any;
  message: string
}

export interface IUser {
  id: number,
  userName: string,
  email: string,
  password: string
}
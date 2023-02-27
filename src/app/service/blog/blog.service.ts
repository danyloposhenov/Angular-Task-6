import { Injectable } from '@angular/core';
import { IBlog, IUser } from 'src/app/interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public createAt = new Date();
  private blogs: Array<IBlog> = [
    {
      id: 1,
      topic: 'First post',
      postedBy: 'admin',
      date: this.createAt,
      message: 'Sign up to create your account and start to use Angular Blog'
    },
  ];

  private users: Array<IUser> = [
    {
      id: 1,
      userName: 'admin',
      email: 'admin@gmail.com',
      password: '1'
    },
  ];

  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  getUsers(): Array<IUser> {
    return this.users;
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }
  addBlog(blog: IBlog): void {
    this.blogs.push(blog);
  }

  updateBlog(blog: IBlog, id: number): void {
    const index = this.blogs.findIndex(blog => blog.id === id);
    this.blogs.splice(index, 1, blog);
  }
  deleteBlog(userName: string): void {
    const index = this.blogs.findIndex(blog => blog.postedBy === userName);
    this.blogs.splice(index, 1);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from 'models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private path = "http://localhost:3000/users/";

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUsers() {
    return this.http.get<user[]>(this.path);
  }

  // Get user by ID
  getUserById(id: number) {
    return this.http.get(`${this.path}${id}`);
  }

  // Add a new user
  addUser(user: any) {
    return this.http.post(this.path, user);
  }

  // Update user by ID
  updateUser(id: number, user: any) {
    return this.http.put(`${this.path}${id}`, user);
  }

  // Delete user by ID
  deleteUser(id: number) {
    return this.http.delete(`${this.path}${id}`);
  }
}

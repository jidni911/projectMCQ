import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from 'models/teken';
import {  SERVER_URL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  private path = SERVER_URL+"/tokens/";
  // private path = "http://192.168.20.135:3000/users/";

  constructor(private http: HttpClient) { }

  // Get all users
  getAll() {
    return this.http.get<token[]>(this.path);
  }

  // Get user by ID
  getById(id: string) {
    return this.http.get(`${this.path}${id}`);
  }

  // Add a new user
  add(token: any) {
    return this.http.post(this.path, token);
  }

  // Update user by ID
  update(id: string, token: any) {
    return this.http.put(`${this.path}${id}`, token);
  }

  // Delete user by ID
  delete(id: string) {
    return this.http.delete(`${this.path}${id}`);
  }
}

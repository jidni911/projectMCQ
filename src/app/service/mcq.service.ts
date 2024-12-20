import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mcq } from 'models/mcq';

@Injectable({
  providedIn: 'root'
})
export class McqService {



  private path = "http://localhost:3000/mcqs/";
  // private path = "http://192.168.20.135:3000/mcqs/";

  constructor(private http: HttpClient) { }

  // Get all users
  getAll() {
    return this.http.get<mcq[]>(this.path);
  }

  // Get user by ID
  getById(id: string) {
    return this.http.get(`${this.path}${id}`);
  }

  // Add a new user
  add(mcq: mcq) {
    return this.http.post(this.path, {
      "question": mcq.question,
      "options": mcq.options,
      "answers":mcq.answers,
      "credit": mcq.credit,
      "topic": mcq.topic
    });
  }

  // Update user by ID
  update(id: string, mcq: mcq) {
    return this.http.put(`${this.path}${id}`, mcq);
  }

  // Delete user by ID
  delete(id: mcq) {
    return this.http.delete(`${this.path}${id}`);
  }
}

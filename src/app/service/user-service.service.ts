import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { user } from 'models/user';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    // private path = "http://localhost:3000/users/";
    private path = "http://192.168.20.135:3000/users/";

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

    logInUser(email: string, password: string): Observable<user | null> {
        return this.getAllUsers().pipe(
          map((allUsers: user[]) => {
            return allUsers.find(user => user.email == email && user.password == password) || null;
          }),
          delay(3000), // Introduce a 3-second delay
          catchError((error) => {
            console.error('Error fetching users:', error);
            return of(null); // Return null in case of an error
          })
        );
      }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, generate, map, Observable, of } from 'rxjs';
import { user } from 'models/user';
import { API_URL, SERVER_URL } from '../global';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {

    private path = SERVER_URL+"/users/";

    constructor(private http: HttpClient) { }
    // Get all users
    getAllUsers() {
        return this.http.get<user[]>(this.path);
    }

    // Get user by ID
    getUserById(id: string) {
        return this.http.get(`${this.path}${id}`);
    }

    // Add a new user
    addUser(user: any) {
        return this.http.post(this.path, user);
    }

    // Update user by ID
    updateUser(id: string, user: any) {
        return this.http.put(`${this.path}${id}`, user);
    }

    // Delete user by ID
    deleteUser(id: string) {
        return this.http.delete(`${this.path}${id}`);
    }

    logInUser(email: string, password: string): Observable<user | null> {
        return this.getAllUsers().pipe(
          map((allUsers: user[]) => {
            let user = allUsers.find(user => user.email == email && user.password == password) || null

            return user;
          }),
          // delay(3000), // Introduce a 3-second delay
          catchError((error) => {
            console.error('Error fetching users:', error);
            return of(null); // Return null in case of an error
          })
        );
      }

}

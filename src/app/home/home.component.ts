import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { user } from 'models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bgimageurl = 'assets/images/homebg.png';
  Date = new Date();


  ngOnInit(): void {
    this.startImageRotation();
  }
  images: string[] = ['captains', 'masud', 'sharmin', 'sumon', 'takingpic', 'tarik', 'trio', 'trio2'];

  startImageRotation(): void {
    setInterval(() => {
      // Generate a random index to select a random image from the array
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.bgimageurl = 'assets/images/' + this.images[randomIndex] + '.png';
    }, 2000);
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: 0, name: "", email: "", password: "", image: "", dob: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }
}

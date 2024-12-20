import { Component, OnInit } from '@angular/core';
import { user } from 'models/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {

  bgimageurl = 'assets/images/mcqbg.png';


  constructor() { }

  ngOnInit(): void {
    
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }


}

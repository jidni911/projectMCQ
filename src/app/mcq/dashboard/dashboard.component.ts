import { Component, OnInit } from '@angular/core';
import { mcq } from 'models/mcq';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { McqService } from 'src/app/service/mcq.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allMCQs!: mcq[]


  constructor(private mcqService: McqService) { }

  ngOnInit(): void {
    this.mcqService.getAll().subscribe((res) => {
      this.allMCQs = res;
    })
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }
}

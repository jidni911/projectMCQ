import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mcq } from 'models/mcq';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { McqService } from 'src/app/service/mcq.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  allMCQs: mcq[] = [];
  allTopics: string[] = [];
  allCredits: string[] = [];
  userMap: Map<string, string> = new Map<string, string>();
  selectedTopics: string[] = [];
  selectedCredits: string[] = [];
  selectedMCQs: mcq[] = [];


  constructor(private mcqService: McqService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    if (!this.isLoggedin()) {
      // this.router.navigateByUrl("/mcq");
    }
    this.mcqService.getAll().subscribe((res) => {
      this.allMCQs = res;


      if (this.getCurrentUser().role == "admin") {
        this.selectedMCQs = this.allMCQs;
      } else {
        this.selectedMCQs = this.allMCQs.filter(mcq => mcq.credit == this.getCurrentUser().id);
      }
      this.selectedMCQs = this.allMCQs;

      this.allTopics = [...new Set(this.selectedMCQs.map(mcq => mcq.topic))];
      this.allCredits = [...new Set(this.selectedMCQs.map(mcq => mcq.credit))];
      this.allCredits.forEach(credit => {
        this.userService.getUserById(credit).subscribe((res) => {
          let user: any = res;
          this.userMap.set(credit + "", user.name);
        });
      });
    })

  }

  getUserName(credit: string): string {
    return this.userMap.get(credit + "") || "Not Found";
  }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" } : AppComponent.currentUser;
  }

  isLoggedin(): boolean {
    return AppComponent.currentUser != null;
  }


}

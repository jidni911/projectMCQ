import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from 'models/user';
import { UserServiceService } from '../service/user-service.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  bgimageurl = 'assets/images/userbg.png';


  allUser!: user[];
  selecterUser: user = { id: "", name: "", email: "", password: "", image: "", dob: "", role: "" };

  @ViewChild(UserInfoComponent) userInfoComponent!: UserInfoComponent;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      // console.log(res);

      this.allUser = res;
    })
  }
  isAdmin(): any {
    return AppComponent.currentUser?.role === 'admin';
  }
  viewUser(user: user) {
    this.selecterUser = user;
    setTimeout(() => {
      this.userInfoComponent.editButtonClick();
    }, 200)
  }
  deleteUser(id: string) {
    if (window.confirm("Are you sure you want to delete this?")) {
      this.userService.deleteUser(id).subscribe((s) => {
        alert('User Deleted');
        this.ngOnInit();
      })
    }
  }
}

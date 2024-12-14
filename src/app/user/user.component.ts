import { Component, OnInit, ViewChild } from '@angular/core';
import { user } from 'models/user';
import { UserServiceService } from '../service/user-service.service';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  bgimageurl = 'assets/images/userbg.png';

  allUser!: user[];
  selecterUser: user = { id: 0, name: "", email: "", password: "", image: "", dob: "" };

  @ViewChild(UserInfoComponent) userInfoComponent!: UserInfoComponent;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      // console.log(res);

      this.allUser = res;
    })
  }
  viewUser(user: user) {
    this.selecterUser = user;
    this.userInfoComponent.editButtonClick();
  }


}

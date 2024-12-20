import { token } from 'models/teken';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { UserServiceService } from 'src/app/service/user-service.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-current-user-info',
  templateUrl: './current-user-info.component.html',
  styleUrls: ['./current-user-info.component.scss']
})
export class CurrentUserInfoComponent {
  constructor(private userService: UserServiceService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  getCurrentUser(): user {
    return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "" } : AppComponent.currentUser;
  }

  getCurrentToken(){
    let t =localStorage.getItem('token');
    return t?t:"no token";
  }

  editButtonClick() {
    this.userEditForm.setValue(this.getCurrentUser());
  }
  userEditForm: FormGroup = new FormGroup({
    id: new FormControl(this.getCurrentUser()),
    name: new FormControl(this.getCurrentUser()),
    email: new FormControl(this.getCurrentUser()),
    password: new FormControl(this.getCurrentUser()),
    dob: new FormControl(this.getCurrentUser()),
    image: new FormControl(this.getCurrentUser())
  })


  onSubmit() {
    this.userService.updateUser(this.userEditForm.value.id, this.userEditForm.value).subscribe((_r) => {
      AppComponent.currentUser = this.userEditForm.value;

      document.getElementById('closeModal')?.click();
      this.router.navigateByUrl('home');
    })
  }
  logOutButtonClick() {
    let t = localStorage.getItem('token')
    if (t) {
      this.tokenService.delete(t).subscribe((_r) => {
        localStorage.removeItem('toker');
        AppComponent.currentUser = null;
        document.getElementById('closeModal2')?.click();
        this.router.navigateByUrl('home');
      })
    }
  }
}

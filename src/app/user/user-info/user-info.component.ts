import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'models/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  constructor(private userService: UserServiceService,
    private router: Router
  ) { }

  @Input() selectingUser: user = { id: "", name: "", email: "", password: "", image: "", dob: "" };
  @Output() notifyParent: EventEmitter<void> = new EventEmitter();
  putUser(user: user) {
    this.selectingUser = user;
    this.editButtonClick();
    setTimeout(() => {
      console.log(this.selectingUser);

    }, 1000);
  }
  editButtonClick() {
    this.userEditForm.setValue(this.selectingUser);
  }
  userEditForm: FormGroup = new FormGroup({
    id: new FormControl(this.selectingUser?.id),
    name: new FormControl(this.selectingUser?.name),
    email: new FormControl(this.selectingUser?.email),
    password: new FormControl(this.selectingUser?.password),
    dob: new FormControl(this.selectingUser?.dob),
    image: new FormControl(this.selectingUser?.image)
  })


  onSubmit() {
    this.userService.updateUser(this.userEditForm.value.id, this.userEditForm.value).subscribe((r) => {
      // document.getElementById('closeModal')?.click();
      // this.router.navigateByUrl('user');
      this.notifyParent.emit();
    })
  }
}

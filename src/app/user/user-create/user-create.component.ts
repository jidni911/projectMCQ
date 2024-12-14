import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  constructor(private userService: UserServiceService) { }

  @Output() notifyParent: EventEmitter<void> = new EventEmitter();


  userCreateForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    dob: new FormControl(),
    image: new FormControl()
  })


  onSubmit() {
    this.userService.addUser(this.userCreateForm.value).subscribe((r) => {
      this.notifyParent.emit();
    })
  }
}

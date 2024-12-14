import { Component, Input } from '@angular/core';
import { user } from 'models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  @Input() selectingUser !: user;

}

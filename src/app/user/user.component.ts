import { Component, OnInit } from '@angular/core';
import { user } from 'models/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


    allUser!: user[]
    
    constructor(private userService: UserServiceService) { }

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe(
            (data) => {
                this.allUser = data;
                console.log(this.allUser);
            },
            (error) => {
                console.error('Error fetching users', error);
            }
        );
    }
    bgimageurl = 'assets/images/userbg.png';


}

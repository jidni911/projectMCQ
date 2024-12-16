import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { user } from 'models/user';
import { UserServiceService } from './service/user-service.service';
import { UserInfoComponent } from './user/user-info/user-info.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private userService: UserServiceService) { }
    ngOnInit(): void {

    }

    title = 'projectmcq';

    currentUser: user | null = null;
    getCurrentUser(): user {
        return this.currentUser == null ? { id: 0, name: "", email: "", password: "", image: "", dob: "" } : this.currentUser;
    }

    isLoggedin(): boolean {
        return this.currentUser != null;
    }
    loggingButtonDisabled: boolean = false;

    loggingform: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })
    logginginFormSubmit() {
        this.loggingButtonDisabled = true;
        this.userService.logInUser(this.loggingform.value.email, this.loggingform.value.password).subscribe((loggedInUser) => {
            if (loggedInUser) {
                // alert('User logged in after delay:' + loggedInUser);
                this.currentUser = loggedInUser;
                this.userInfoComponent.putUser(this.getCurrentUser());
                document.getElementById('bsModalCloseButton')?.click();
            } else {
                // alert('Invalid email or password');
            }
            this.loggingButtonDisabled = false;
        });

    }

    @ViewChild(UserInfoComponent) userInfoComponent!: UserInfoComponent;
    viewUser() {
        setTimeout(() => {
          this.userInfoComponent.putUser(this.getCurrentUser());
        }, 200);
    }

}

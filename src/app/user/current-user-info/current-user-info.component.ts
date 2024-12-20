import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'models/user';
import { AppComponent } from 'src/app/app.component';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
    selector: 'app-current-user-info',
    templateUrl: './current-user-info.component.html',
    styleUrls: ['./current-user-info.component.scss']
})
export class CurrentUserInfoComponent {
    constructor(private userService: UserServiceService,
        private router: Router
    ) { }

    getCurrentUser(): user {
        return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "" } : AppComponent.currentUser;
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
        AppComponent.currentUser = null;
        document.getElementById('closeModal2')?.click();
            this.router.navigateByUrl('home');
    }
}

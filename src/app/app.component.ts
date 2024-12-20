import { token } from 'models/teken';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { user } from 'models/user';
import { UserServiceService } from './service/user-service.service';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private userService: UserServiceService, private router: Router, private tokenService: TokenService) { }
    ngOnInit(): void {
        let t = localStorage.getItem('token');
        if (t) {
            this.tokenService.getById(t).subscribe((res) => {
                if (res) {
                    let r: any = res;
                    this.userService.logInUser(r.mail, r.pass).subscribe((loggedInUser) => {
                        if (loggedInUser) {
                            AppComponent.currentUser = loggedInUser;
                        } else {
                            // alert('Invalid email or password');
                        }
                        this.loggingButtonDisabled = false;
                    });
                }
            })
        }
    }

    title = 'MCQ Master';
    currentTab = 'home';
    tabClicked(tab: string) {
        this.currentTab = tab;
        this.router.navigateByUrl(tab);
    }

    static currentUser: user | null = null;
    static role : string = "";
    getCurrentUser(): user {
        return AppComponent.currentUser == null ? { id: "", name: "", email: "", password: "", image: "", dob: "", role : "" } : AppComponent.currentUser;
    }

    isLoggedin(): boolean {
        return AppComponent.currentUser != null;
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
                AppComponent.currentUser = loggedInUser;
                this.tokenService.add({ "mail": AppComponent.currentUser.email, "pass": AppComponent.currentUser.password }).subscribe((r) => {
                    if (r) {
                        let t: any = r;
                        localStorage.setItem("token", t.id);
                    }
                }
                )
                document.getElementById('bsModalCloseButton')?.click();
            } else {
                // alert('Invalid email or password');
            }
            this.loggingButtonDisabled = false;
        });

    }

    tryLogin(val: any) {
      this.loggingform.patchValue({
          email: val.email,
          password: val.password
      });
      this.logginginFormSubmit();
  }


}

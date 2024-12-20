import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { McqComponent } from './mcq/mcq.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { CreatemcqComponent } from './mcq/createmcq/createmcq.component';
import { TestComponent } from './test/test.component';
import { CurrentUserInfoComponent } from './user/current-user-info/current-user-info.component';
import { QuizComponent } from './mcq/quiz/quiz.component';
import { DashboardComponent } from './mcq/dashboard/dashboard.component';
import { ManageComponent } from './mcq/manage/manage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    McqComponent,
    NotFoundComponent,
    UserInfoComponent,
    UserCreateComponent,
    CreatemcqComponent,
    TestComponent,
    CurrentUserInfoComponent,
    QuizComponent,
    DashboardComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

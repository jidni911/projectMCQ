import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { McqComponent } from './mcq/mcq.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';
import { CreatemcqComponent } from './mcq/createmcq/createmcq.component';
import { QuizComponent } from './mcq/quiz/quiz.component';
import { DashboardComponent } from './mcq/dashboard/dashboard.component';
import { ManageComponent } from './mcq/manage/manage.component';

const routes: Routes = [
  {path : "" , redirectTo: "home", pathMatch:"full"},
  {path : "home", component : HomeComponent},
  {path : "mcq", redirectTo: "mcq/dashboard", pathMatch:"full"},
  {path : "mcq", component : McqComponent, children: [
    {path : "dashboard", component : DashboardComponent},
    {path : "create", component : CreatemcqComponent},
    {path : "quiz", component : QuizComponent},
    {path : "manage", component : ManageComponent},

  ]
  },
  {path : "user", component : UserComponent},
  {path : "test", component : TestComponent},
  {path : "addmcq", component : CreatemcqComponent},
  {path : "*/*", component : NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

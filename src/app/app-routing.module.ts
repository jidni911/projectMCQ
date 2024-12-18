import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { McqComponent } from './mcq/mcq.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path : "" , redirectTo: "home", pathMatch:"full"},
  {path : "home", component : HomeComponent},
  {path : "mcq", component : McqComponent},
  {path : "user", component : UserComponent},
  {path : "test", component : TestComponent},
  {path : "*/*", component : NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

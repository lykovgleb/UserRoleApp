import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserComponent},
  {path: 'add', component: AddUserComponent},
  {path: 'change/:id', component: ChangeUserComponent},
  {path: 'form', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

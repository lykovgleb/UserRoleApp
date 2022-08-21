import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';
import { AddRoleComponent } from './add-role/add-role.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { RoleState } from './state/role-state';
import { UserState } from './state/user-state';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserComponent,
    AddRoleComponent,
    ChangeUserComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([RoleState, UserState],{developmentMode: !environment.production})
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpService } from './http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from './add-role/add-role.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { RoleState } from './state/role-state';
import { UserState } from './state/user-state';
import { UserFormComponent } from './user-form/user-form.component';
import { ChangeRoleComponent } from './change-role/change-role.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddRoleComponent,
    UserFormComponent,
    ChangeRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([RoleState, UserState], { developmentMode: !environment.production })
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

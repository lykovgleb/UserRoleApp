import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { RoleSelectors } from '../state/role-selectors';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  @Select(RoleSelectors.roles) roles$!: Observable<Role[]>;
  //roles : Role[] = [];
  user: User ={
    userId : 0,
    userName : "",
    userRoles : [],
  };
  constructor(private http : HttpService) { }

  ngOnInit(): void {
    //this.getRoles();
  }

  addRoleToUser(role : Role) {
    this.user.userRoles.push(role)
  }

  removeRoleFromUser(role : Role) {
    this.user.userRoles.splice(this.user.userRoles.indexOf(role), 1)
  }

  showAddRoleButton(role : Role) : boolean {
    return this.user.userRoles.includes(role)
  }

  addUser() {
    this.http.addUser(this.user).
      subscribe()
  }

  // private getRoles() {
  //   this.http.getRoles()
  //     .subscribe((roles : any) => this.roles = roles )
  // }
}



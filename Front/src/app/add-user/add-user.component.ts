import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { GetRolesAction } from '../state/role-actions';
import { RoleSelectors } from '../state/role-selectors';
import { AddUserAction } from '../state/user-actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Select(RoleSelectors.roles) roles$!: Observable<Role[]>;

  user: User = {
    userId: 0,
    userName: "",
    userRoles: [],
  };
  constructor(private http: HttpService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetRolesAction())
  }

  addRoleToUser(role: Role) {
    this.user.userRoles.push(role)
  }

  removeRoleFromUser(role: Role) {
    this.user.userRoles.splice(this.user.userRoles.indexOf(role), 1)
  }

  showAddRoleButton(role: Role): boolean {
    return this.user.userRoles.includes(role)
  }

  addUser() {
    this.store.dispatch(new AddUserAction(this.user))
    this.user = {
      userId: 0,
      userName: "",
      userRoles: [],
    };
  }
}



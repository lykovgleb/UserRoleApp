import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { GetRolesAction } from '../state/role-actions';
import { RoleSelectors } from '../state/role-selectors';
import { GetUsersAction } from '../state/user-actions';
import { UserSelectors } from '../state/user-selector';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})
export class ChangeUserComponent implements OnInit {
  
  @Select(RoleSelectors.roles) roles$!: Observable<Role[]>;
  @Select(UserSelectors.users) users$!: Observable<User[]>;
  user$!: Observable<User> | undefined
  user!: User
  

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private store: Store
  ) { }

  ngOnInit(): void {
    if (!this.roles$) this.store.dispatch(new GetRolesAction())
    if (!this.users$) this.store.dispatch(new GetUsersAction())
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    //this.user$ = this.store.select(UserState.getUser(id))
    //this.user$.subscribe(user => this.user = user)
  }

  addRoleToUser(role: Role) {
    if (this.user$)
      this.user$.subscribe(user => user.userRoles.push(role))
  }
 
  removeRoleFromUser(role: Role) {
    if (this.user)
      this.user.userRoles.splice(this.user.userRoles.indexOf(role), 1)
  }

  showAddRoleButton(role: Role): boolean {
    if (this.user$)
    this.user$.subscribe(user => {
      let result = user.userRoles.includes(role)
      return !result;
    });
    return true;      
  }

  saveUser() {
    if (this.user)
      this.http.changeUser(this.user).subscribe()
  } 
}

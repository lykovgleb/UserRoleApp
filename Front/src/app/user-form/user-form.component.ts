import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { GetRolesAction, SetEditedRoleAction } from '../state/role-actions';
import { RoleSelectors } from '../state/role-selectors';
import { AddUserAction, SetEditedUserAction, UpdateUserAction } from '../state/user-actions';
import { UserSelectors } from '../state/user-selector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Select(UserSelectors.editedUser) user$!: Observable<User>
  @Select(RoleSelectors.roles) roles$!: Observable<Role[]>

  editedRoleId: string = ""

  userForm: FormGroup = this.fb.group({
    userId: "00000000-0000-0000-0000-000000000000",
    userName: ['', Validators.required],
    userRoles: [[], Validators.required]
  })
  editUser = false;
  private sb = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
  }
  ngOnDestroy(): void {
    this.clearForm();
    this.sb.unsubscribe();
  }

  ngOnInit(): void {
    this.sb.add(
      this.roles$.subscribe(roles => {
        if (roles.length === 0) {
          this.store.dispatch(new GetRolesAction());
        }
      })
    )
    this.sb.add(
      this.user$.subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            userId: user.userId,
            userName: user.userName,
            userRoles: [...user.userRoles]
          })
          this.editUser = true;
        }
        else this.editUser = false
      })
    )
  }

  submit() {
    if (this.editUser) {
      this.store.dispatch(new UpdateUserAction(this.userForm.value))
    } else {
      this.store.dispatch(new AddUserAction(this.userForm.value))
    }
    this.router.navigate(['/users']);
  }

  clearForm() {
    this.userForm.reset();
    this.store.dispatch(new SetEditedUserAction(null));
  }

  addRoleToUser(role: Role) {
    let newUserRoles = this.userForm.value.userRoles as Array<Role>;
    newUserRoles.push(role);
    this.userForm.patchValue({

      userRoles: [...newUserRoles]
    });
  }

  removeRoleFromUser(userRole: Role) {
    this.userForm.patchValue({
      userRoles: [...this.userForm.value.userRoles.filter((role: { id: string; }) => role.id !== userRole.id)]
    });
  }

  editeRole(role: Role) {
    this.store.dispatch(new SetEditedRoleAction(role));
    this.editedRoleId = role.id;
  }

  savedRole() {
    this.editedRoleId = "";
  }

  showRoleButton(userRole: Role): boolean {
    let roles = this.userForm.value.userRoles as Array<Role>;
    return !roles.some(role => role.id === userRole.id);
  }
}

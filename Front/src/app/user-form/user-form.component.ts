import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Role } from '../Models/Role';
import { User } from '../Models/User';
import { RoleSelectors } from '../state/role-selectors';
import { AddUserAction, SetEditedUserAction, UpdateUserAction } from '../state/user-actions';
import { UserSelectors } from '../state/user-selector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Select(UserSelectors.editedUser) user$!: Observable<User>
  @Select(RoleSelectors.roles) roles$!: Observable<Role[]>
  userForm: FormGroup = this.fb.group({
    userId: 0,
    userName: '',
    userRoles: []
  });
  editUser = false;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {
    // this.userForm = this.fb.group({
    //   userId: 0,
    //   userName: '',
    //   userRoles: []
    // })
  }

  ngOnInit(): void {
    this.subscription.add(
      this.user$.subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            userId: user.userId,
            userName: user.userName,
            userRoles: user.userRoles
          })
          this.editUser = true;
        }
        else this.editUser = false;
      }
      )
    )
  }

  submit(){
    if (this.editUser) {
      this.subscription.add(
        this.store.dispatch(new UpdateUserAction(this.userForm.value)).subscribe(()=>this.clearForm())
      )
    } else {
      this.subscription.add(
        this.store.dispatch(new AddUserAction(this.userForm.value)).subscribe(() => this.clearForm())
      )
    }
  }

  clearForm() {
    this.userForm.reset();
    this.store.dispatch(new SetEditedUserAction(null));
  }

  addRoleToUser(role: Role) {
    this.userForm.patchValue({
      userRoles: [...this.userForm.value.userRoles, role]
    })
  }

  removeRoleFromUser(userRole: Role){
    this.userForm.patchValue({
      userRoles: [ ...this.userForm.value.userRoles.filter((role: { id: number; }) => role.id !== userRole.id)]
    })
  }
}

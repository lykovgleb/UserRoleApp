import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Role } from '../Models/Role';
import { DeleteRoleAction, UpdateRoleAction } from '../state/role-actions';
import { RoleSelectors } from '../state/role-selectors';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {

  @Select(RoleSelectors.editedRole) role$!: Observable<Role>;
  role: Role = {
    id: 0,
    name: ""
  }

  @Output() saved = new EventEmitter();

  private sb = new Subscription();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.sb.add(
      this.role$.subscribe(role => {
        if (role) {
          this.role.id = role.id
          this.role.name = role.name
        }
      })
    )
  }

  submit() {
    this.store.dispatch(new UpdateRoleAction(this.role));
    this.saved.emit();
  }

  delete() {
    this.store.dispatch(new DeleteRoleAction(this.role));
    this.saved.emit();
  }
}

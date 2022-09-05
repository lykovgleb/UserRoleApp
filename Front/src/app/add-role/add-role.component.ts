import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';
import { AddRoleAction } from '../state/role-actions';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {

  role: Role = {
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
  };

  constructor(private http: HttpService, private store: Store) { }



  addRole() {
    this.store.dispatch(new AddRoleAction(this.role))
    this.role = {
      id:  "00000000-0000-0000-0000-000000000000",
      name: "",
    };
  }
}

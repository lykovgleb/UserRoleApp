import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  
  role : Role = {
    id: 0,
    name: "",
  };

  constructor(private http : HttpService) { }

  addRole() {
    return this.http.addRole(this.role).subscribe()
  }
}

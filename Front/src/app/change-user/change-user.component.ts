import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Role } from '../Models/Role';
import { User } from '../Models/User';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.css']
})
export class ChangeUserComponent implements OnInit {

  user: User | undefined;
  roles : Role[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getRoles();
  }

  addRoleToUser(role : Role) {
    if(this.user)
      this.user.userRoles.push(role)
  }

  removeRoleFromUser(role : Role) {
    if(this.user)
      this.user.userRoles.splice(this.user.userRoles.indexOf(role), 1)
  }

  showAddRoleButton(role : Role): boolean {
    if(this.user)
      return !this.user.userRoles.includes(role);
    return true;
  }

  saveUser() {
    if(this.user)
      this.http.changeUser(this.user).subscribe()
  }

  private getUser() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.http.getUser(id).subscribe((user : any) => this.user = user);
  }

  private getRoles() {
    this.http.getRoles()
      .subscribe((roles : any) => this.roles = roles )
  }
}

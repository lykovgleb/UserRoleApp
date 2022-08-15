import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : User[] = [];
  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(): void {
    this.http.getUsers()
      .subscribe((users : any) => this.users = users )
  }

  deleteUser(user: User) {
    this.http.deleteUser(user).subscribe()
    this.users.splice(this.users.indexOf(user))
  }

}

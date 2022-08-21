import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../http.service';
import { Select, Store } from '@ngxs/store';
import { UserSelectors } from '../state/user-selector';
import { Observable } from 'rxjs';
import { DeleteUserAction, GetUsersAction, SetEditedUserAction } from '../state/user-actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Select(UserSelectors.users) users$!: Observable<User[]>;

  constructor(private http: HttpService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUsersAction())
  }


  deleteUser(user: User) {
    this.store.dispatch(new DeleteUserAction(user))
  }

  changeUser(user: User) {
    this.store.dispatch(new SetEditedUserAction(user))
  }

}

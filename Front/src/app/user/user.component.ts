import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../http.service';
import { Select, Store } from '@ngxs/store';
import { UserSelectors } from '../state/user-selector';
import { Observable, Subscription } from 'rxjs';
import { DeleteUserAction, GetUsersAction, SetEditedUserAction } from '../state/user-actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy{

  @Select(UserSelectors.users) users$!: Observable<User[]>;

  private sb = new Subscription();

  constructor(private http: HttpService, private store: Store, private router: Router) { }

  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }

  ngOnInit(): void {
    this.sb.add(
    this.users$.subscribe(users => {
      if(users.length === 0) {this.store.dispatch(new GetUsersAction())}
    }    
    ))
  }

  deleteUser(user: User) {
    this.store.dispatch(new DeleteUserAction(user))
  }

  changeUser(user: User) {
    this.store.dispatch(new SetEditedUserAction(user))
    this.router.navigate(['/form']);
  }

}

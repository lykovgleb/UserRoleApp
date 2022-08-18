import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { User } from "../Models/User";

export interface UserStateModel {
    users : User[]
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users : [],
    }
})
@Injectable()
export class UserState {}
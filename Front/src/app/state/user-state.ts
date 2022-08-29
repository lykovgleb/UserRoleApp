import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { HttpService } from "../http.service";
import { User } from "../Models/User";
import { AddUserAction, DeleteUserAction, GetUsersAction, SetEditedUserAction, UpdateUserAction } from "./user-actions";

export interface UserStateModel {
    users: User[];
    editedUser: User | null;
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        editedUser: null
    }
})
@Injectable()
export class UserState {

    constructor(private http: HttpService) { }

    @Action(SetEditedUserAction)
    setEditedUser(ctx: StateContext<UserStateModel>, { user }: SetEditedUserAction) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            editedUser: user
        })
    }

    @Action(GetUsersAction)
    getUsers(ctx: StateContext<UserStateModel>) {
        return this.http.getUsers().pipe(tap((users: User[]) => {
            const state = ctx.getState()
            ctx.setState({
                ...state,
                users: users
            })
            console.log("GetUsersAction")
        }))
    }

    @Action(AddUserAction)
    addUser(ctx: StateContext<UserStateModel>, { user }: AddUserAction) {

        if (!user) return;

        return this.http.addUser(user).pipe(tap((user: User) => {
            const state = ctx.getState()
            ctx.patchState({
                users: [...state.users, user]
            })
            console.log("AddUsersAction")
        }))
    }

    @Action(DeleteUserAction)
    deleteUser(ctx: StateContext<UserStateModel>, { user }: AddUserAction) {

        if (!user) return;

        return this.http.deleteUser(user).pipe(tap(() => {
            const state = ctx.getState()
            const newState = state.users.filter(a => a.userId !== user.userId)
            ctx.patchState({
                users: newState
            })

        }))
    }

    @Action(UpdateUserAction)
    updateUser(ctx: StateContext<UserStateModel>, { user }: UpdateUserAction) {

        if (!user) return;

        return this.http.changeUser(user).pipe(tap((updatedUser: User) => {
            const state = ctx.getState()
            const newUsers = [...state.users]
            newUsers[newUsers.findIndex(user => user.userId === updatedUser.userId)] = updatedUser;
            ctx.patchState({
                users: newUsers
            })
        }))
    }
}
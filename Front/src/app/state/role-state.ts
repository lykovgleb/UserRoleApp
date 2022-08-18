import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { HttpService } from "../http.service";
import { Role } from "../Models/Role";
import { AddRoleAction, GetRolesAction } from "./role-actions";

export interface RoleStateModel {
    roles: Role[]
}

@State<RoleStateModel>({
    name: 'roles',
    defaults: {
        roles: [],
    }
})
@Injectable()
export class RoleState {

    constructor(private http: HttpService) { }

    @Action(AddRoleAction)
    addRole(ctx: StateContext<RoleStateModel>, addRole: AddRoleAction) {

        const {role} = addRole;

        if (!role) return;

        return this.http.addRole(role).pipe(tap((newRole: Role) => {

            const state = ctx.getState();
            ctx.patchState({
                roles: [...state.roles, newRole],
            })            
        }))        
    }

    @Action(GetRolesAction)
    getRoles(ctx: StateContext<RoleStateModel>) {
        return this.http.getRoles().pipe(tap(roles => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                roles:roles
            })
        }))
    }
}
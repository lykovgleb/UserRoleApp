import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { HttpService } from "../http.service";
import { Role } from "../Models/Role";
import { AddRoleAction, DeleteRoleAction, GetRolesAction, SetEditedRoleAction, UpdateRoleAction } from "./role-actions";

export interface RoleStateModel {
    roles: Role[];
    editedRole: Role | null;
}

@State<RoleStateModel>({
    name: 'roles',
    defaults: {
        roles: [],
        editedRole: null
    }
})
@Injectable()
export class RoleState {

    constructor(private http: HttpService) { }

    @Action(AddRoleAction)
    addRole(ctx: StateContext<RoleStateModel>, {role}: AddRoleAction) {

        if (!role) return;

        return this.http.addRole(role).pipe(tap((newRole: Role) => {

            const state = ctx.getState();
            ctx.patchState({
                roles: [...state.roles, newRole]
            })
            console.log("AddRoleAction")         
        }))        
    }

    @Action(GetRolesAction)
    getRoles(ctx: StateContext<RoleStateModel>) {
        return this.http.getRoles().pipe(tap((roles: Role[]) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                roles:roles
            })
            console.log("GetRolesAction")
        }))
    }

    @Action(SetEditedRoleAction)
    setEditedRole(ctx: StateContext<RoleStateModel>, {role}: SetEditedRoleAction) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            editedRole: role
        })
    }

    @Action(DeleteRoleAction)
    deleteRole(ctx: StateContext<RoleStateModel>, { role }: AddRoleAction) {

        if (!role) return;

        return this.http.deleteRole(role).pipe(tap((deletedRole: Role) => {
            const state = ctx.getState()
            const newState = state.roles.filter( role => role.id !== deletedRole.id)
            ctx.patchState({
                roles: newState
            })
        }))
    }

    @Action(UpdateRoleAction)
    updateRole(ctx: StateContext<RoleStateModel>, { role }: UpdateRoleAction) {

        if (!role) return;

        return this.http.changeRole(role).pipe(tap((updatedRole: Role) => {
            const state = ctx.getState()
            const newRoles = [...state.roles]
            newRoles[newRoles.findIndex(role => role.id === updatedRole.id)] = updatedRole;
            ctx.patchState({
                roles: newRoles
            })
        }))
    }
}
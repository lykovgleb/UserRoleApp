import { Selector } from "@ngxs/store";
import { Role } from "../Models/Role";
import { RoleState, RoleStateModel } from "./role-state";

export class RoleSelectors {

    @Selector([RoleState])
    static roles(state: RoleStateModel): Role[] {
        return state.roles;
    }

    @Selector([RoleState])
    static editedRole(state: RoleStateModel) {
        return state.editedRole;
    }
}
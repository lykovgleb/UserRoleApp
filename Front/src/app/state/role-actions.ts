import { Role } from "../Models/Role";

export class AddRoleAction {
    static readonly type = '[Role] Add role'
    constructor(public role: Role) {}
}

export class GetRolesAction {
    static readonly type = '[Role] Get roles'
    constructor() {}
}
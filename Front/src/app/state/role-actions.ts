import { Role } from "../Models/Role";

export class AddRoleAction {
    static readonly type = '[Role] Add role'
    constructor(public role: Role) { }
}

export class GetRolesAction {
    static readonly type = '[Role] Get roles'
    constructor() { }
}

export class DeleteRoleAction {
    static readonly type = '[Role] Delete role'
    constructor(public role: Role) { }
}

export class UpdateRoleAction {
    static readonly type = '[Role] Update role'
    constructor(public role: Role) { }
}

export class SetEditedRoleAction {
    static readonly type = '[Role] Set edited role'
    constructor(public role: Role | null) { }
}
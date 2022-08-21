import { User } from "../Models/User"

export class AddUserAction {
    static readonly type = '[User] Add User'
    constructor(public user: User) {}
}

export class GetUsersAction {
    static readonly type = '[User] Get users'
    constructor() {}
}

export class DeleteUserAction {
    static readonly type = '[User] Delete user'
    constructor(public user: User) {}
}

export class UpdateUserAction {
    static readonly type = '[User] Update user'
    constructor(public user: User) {}
}

export class SetEditedUserAction {
    static readonly type = '[User] Set edited user'
    constructor(public user: User | null) {}
}
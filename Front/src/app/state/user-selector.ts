import { Selector } from "@ngxs/store";
import { User } from "../Models/User";
import { UserState, UserStateModel } from "./user-state";

export class UserSelectors {

    @Selector([UserState])
    static users(state: UserStateModel): User[] {
        return state.users;
    }

    @Selector([UserState])
    static editedUser(state: UserStateModel) {
        return state.editedUser;
    }
}
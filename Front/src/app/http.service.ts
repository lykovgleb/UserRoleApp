import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Role } from "./Models/Role";
import { User } from "./Models/User";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(environment.baseUrl + '/User');
    }

    getUser(id: string) {
        return this.http.get<User>(environment.baseUrl + '/User/' + id);
    }

    addUser(user: User) {
        return this.http.post<User>(environment.baseUrl + '/User', user);
    }

    changeUser(user: User) {
        return this.http.put<User>(environment.baseUrl + '/User', user);
    }

    deleteUser(user: User) {
        return this.http.delete(environment.baseUrl + '/User/' + user.userId);
    }

    getRoles() {
        return this.http.get<Role[]>(environment.baseUrl + '/Role');
    }

    addRole(role: Role) {
        return this.http.post<Role>(environment.baseUrl + '/Role', role);
    }

    deleteRole(role: Role) {
        return this.http.delete(environment.baseUrl + '/Role/' + role.id);
    }

    changeRole(role: Role) {
        return this.http.put<Role>(environment.baseUrl + '/Role', role);
    }

}
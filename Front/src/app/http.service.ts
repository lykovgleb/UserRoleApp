import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Role } from "./Models/Role";
import { User } from "./Models/User";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(environment.baseUrl + '/User').pipe();
    }

    getUser(id: number) {
        return this.http.get<User>(environment.baseUrl + '/User/' + id).pipe();
    }

    addUser(user: User) {
        return this.http.post<User>(environment.baseUrl + '/User', user).pipe();
    }

    changeUser(user: User) {
        return this.http.put<User>(environment.baseUrl + '/User', user).pipe();
    }

    deleteUser(user: User) {
        return this.http.delete<User>(environment.baseUrl + '/User/' + user.userId).pipe();
    }

    getRoles() {
        return this.http.get<Role[]>(environment.baseUrl + '/Role').pipe();
    }

    addRole(role: Role) {
        return this.http.post<Role>(environment.baseUrl + '/Role', role).pipe();
    }

    deleteRole(role: Role) {
        return this.http.delete<Role>(environment.baseUrl + '/Role/' + role.id).pipe();
    }

    changeRole(role: Role) {
        return this.http.put<Role>(environment.baseUrl + '/Role', role).pipe();
    }

}
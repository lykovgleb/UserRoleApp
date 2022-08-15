import { Role } from './Role';

export interface User{
  userId : number,
  userName : string,
  userRoles : Role[]
}

/* export class User{
    constructor (public userId : number, public userName : string, public userRoles : Role[]){}
  } */
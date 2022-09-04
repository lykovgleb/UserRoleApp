import { Role } from './Role';

export interface User {
  userId: string,
  userName: string,
  userRoles: Role[]
}
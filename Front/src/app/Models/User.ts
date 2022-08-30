import { Role } from './Role';

export interface User {
  userId: number,
  userName: string,
  userRoles: Role[]
}
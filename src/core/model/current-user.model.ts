import { Role } from '../enum';

export class CurrentUserModel {
  userId: number;
  deviceId: string;
  role: Role;
}

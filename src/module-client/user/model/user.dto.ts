import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ChangeActiveUserDTO {
  @IsBoolean()
  isActive: boolean;
}

export class RegisterUserDTO {
  @IsNotEmpty({ message: 'Empty device ID' })
  deviceId: string;
}

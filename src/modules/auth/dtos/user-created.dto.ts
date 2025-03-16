import { IsString } from "class-validator";

export class UserCreatedDto {
  @IsString()
  message: string;
}

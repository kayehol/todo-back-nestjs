import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginResponseDto {
  @ApiProperty({ description: "Token de acesso JWT" })
  @IsString()
  access_token: string;
}

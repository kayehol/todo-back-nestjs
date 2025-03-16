import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
  @ApiProperty({ description: "Token de acesso JWT" })
  access_token: string;
}

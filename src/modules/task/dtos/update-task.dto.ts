import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

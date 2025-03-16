import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "../auth/auth.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [
    ...userProviders,
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }

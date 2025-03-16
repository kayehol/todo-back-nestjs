import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "src/providers/user.providers";
import { UserService } from "src/services/user.service";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
  ],
})
export class UserModule { }

import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { TaskService } from "./task.service";
import { taskProviders } from "./task.providers";
import { TaskController } from "./task.controller";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...taskProviders,
    TaskService,
  ],
  controllers: [TaskController]
})
export class TaskModule { }

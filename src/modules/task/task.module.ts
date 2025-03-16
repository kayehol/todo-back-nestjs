import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { TaskService } from "src/services/task.service";
import { taskProviders } from "src/providers/task.providers";

@Module({
  imports: [DatabaseModule],
  providers: [
    ...taskProviders,
    TaskService,
  ],
})
export class TaskModule { }

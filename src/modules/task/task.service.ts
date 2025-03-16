import { Inject, Injectable } from "@nestjs/common";
import { TASK_REPOSITORY } from "src/constants";
import { Task } from "./task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
  ) { }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
        user: true,
      }
    });
  }

}

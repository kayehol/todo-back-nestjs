import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TASK_REPOSITORY } from "../../constants";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private taskRepository: Repository<Task>,
  ) { }

  async findAll(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      order: {
        createdAt: "DESC"
      }
    });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({
      id
    });

    if (!task)
      throw new NotFoundException("Tarefa inexistente");

    return task;
  }

  async create(newTask: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(newTask);

    return await this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto
    });

    if (!task)
      throw new NotFoundException("Tarefa inexistente");

    return await this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.findOne(id);

    if (!task)
      throw new NotFoundException("Tarefa inexistente");

    await this.taskRepository.remove(task);
  }

}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@Controller("api/task")
export class TaskController {
  constructor(
    private readonly service: TaskService,
  ) { }

  @ApiOperation({ summary: "Busca tarefas" })
  @Get()
  getTasks(): Promise<Task[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: "Cria uma nova tarefa" })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.service.create(createTaskDto);
  }

  @ApiOperation({ summary: "Atualiza uma tarefa existente" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.service.update(+id, updateTaskDto);

  }

  @Delete(":id")
  remove(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}

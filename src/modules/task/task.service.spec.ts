import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { TASK_REPOSITORY } from "../../constants";
import { TaskService } from "./task.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dtos/create-task.dto";

const mockTaskRepository = {
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
        {
          provide: TASK_REPOSITORY,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  describe('create', () => {
    it('should create a task', async () => {
      const createTask: CreateTaskDto = {
        title: 'Code',
        description: 'Code all night',
        done: false,
        userId: 1
      };
      const task = new Task();

      Object.assign(task, createTask);

      jest.spyOn(repository, 'create').mockReturnValue(task);
      jest.spyOn(repository, 'save').mockResolvedValue(task);

      const result = await service.create(createTask);

      expect(result).toEqual(task);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const taskId = 1;
      const task = new Task();
      task.id = taskId;

      jest.spyOn(service, 'findOne').mockResolvedValue(task);
      jest.spyOn(repository, 'remove').mockResolvedValue(task);

      await service.delete(taskId);

      expect(repository.remove).toHaveBeenCalledWith(task);
    });

  });
})


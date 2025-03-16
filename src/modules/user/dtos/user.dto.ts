import { Task } from "src/modules/task/task.entity";

export class UserDto {
  id: number;
  username: string;
  createdAt: Date;
  tasks: Task[];
}

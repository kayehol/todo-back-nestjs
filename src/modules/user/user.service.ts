import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/constants";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      username
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async userExists(username: string): Promise<boolean> {
    return this.userRepository.exists({
      where: {
        username
      }
    })
  }

  async create(newUser: CreateUserDto): Promise<User> {
    // hash user pass
    const user = this.userRepository.create(newUser);

    return this.userRepository.save(user);
  }

}

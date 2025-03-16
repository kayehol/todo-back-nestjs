import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/constants";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,

    private authService: AuthService,
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
    newUser.password = await this.authService.hashPass(newUser.password);

    const user = this.userRepository.create(newUser);

    return this.userRepository.save(user);
  }

}

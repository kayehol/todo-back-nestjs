import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserService } from "./user.service"
import { User } from "./user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { USER_REPOSITORY } from "../../constants";
import { AuthService } from "../auth/auth.service";
import { UserDto } from "./dtos/user.dto";

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockAuthService = {
  hashPass: jest.fn(),
}

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = { username: 'jose', password: 'senhateste' };
      const user = new User();

      Object.assign(user, createUserDto);

      const expectedUser = new UserDto();
      Object.assign(user, expectedUser);

      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result: UserDto = await service.create(createUserDto);

      expect(result).toEqual(expectedUser);
    });
  });
})


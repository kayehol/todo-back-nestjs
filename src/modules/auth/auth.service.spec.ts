import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

const mockUserService = {
  findOne: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  })

  describe('login', () => {
    it('should throw exception if user does not exist', async () => {
      const userLogin: LoginDto = { username: 'jose', password: 'senhateste' };

      mockUserService.findOne.mockResolvedValue(null);

      try {
        await authService.login(userLogin);
      } catch (error) {
        expect(error instanceof HttpException).toBe(true);
        expect(error.response).toBe("Credenciais inválidas");
        expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('should return a token if credentials are valid', async () => {
      const userLogin: LoginDto = { username: 'joao', password: 'senhateste' };
      const user = { id: 1, username: 'joao', password: 'senhahash' };

      mockUserService.findOne.mockResolvedValue(user);

      const verifyPassMock = jest.fn().mockReturnValue(true);
      authService.verifyPass = verifyPassMock;

      const token = 'mockedJwtToken';
      mockJwtService.signAsync.mockResolvedValue(token);

      const result = await authService.login(userLogin);

      expect(result).toEqual({
        access_token: token,
      });
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        username: user.username,
      });
    });
  });

})


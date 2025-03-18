import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dtos/register.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { LoginDto } from "./dtos/login.dto";
import { UserDto } from "../user/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService
  ) { }

  async hashPass(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  }

  verifyPass(user: User, userLogin: RegisterDto): boolean {
    return bcrypt.compareSync(userLogin.password, user.password);
  }

  async register(user: RegisterDto): Promise<UserDto> {
    const userExists = await this.userService.userExists(user.username);

    if (userExists)
      throw new BadRequestException("Credenciais inválidas");

    return await this.userService.create(user);
  }

  async login(userLogin: LoginDto): Promise<string> {
    const user = await this.userService.findOne(userLogin.username);

    if (!user)
      throw new UnauthorizedException("Credenciais inválidas");

    const verified = this.verifyPass(user, userLogin);

    if (!verified)
      throw new UnauthorizedException("Credenciais inválidas");

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return token;

  }
}

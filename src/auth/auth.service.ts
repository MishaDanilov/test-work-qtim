import * as bcrypt from "bcryptjs";
import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUsersDto } from "src/users/dto";
import { UsersService } from "src/users/users.service";
import { Users } from "src/users/users.entity";
import { TokenDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: Users): Promise<TokenDto> {
    return this.generateTokens(user);
  }

  async registration(userDto: CreateUsersDto): Promise<TokenDto> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        "User with this email is elready registered",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateTokens(user);
  }

  generateTokens(user: Users): TokenDto {
    const payload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}` }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (!passwordEquals) return null;
    return user;
  }
}

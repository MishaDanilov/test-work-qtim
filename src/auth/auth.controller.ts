import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUsersDto } from "src/users/dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Post("/login")
  login(@Req() request) {
    return this.authService.login(request.user);
  }

  @UsePipes(ValidationPipe)
  @Post("/registration")
  registration(@Body() userDto: CreateUsersDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("/refresh")
  async refreshToken(@Req() req) {
    return this.authService.generateTokens(req.user);
  }
}

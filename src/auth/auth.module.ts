import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./strategies/local-strategy";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { ConfigModule } from "@nestjs/config";
import { RefreshJwtStrategy } from "./strategies/refreshToken.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    JwtModule.register({
      secret: `${process.env.PRIVATE_KEY}`,
      signOptions: {
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}`,
      },
    }),
    UsersModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}

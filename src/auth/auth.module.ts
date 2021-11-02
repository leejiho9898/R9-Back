import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth/strategies/local.strategy";
import { RefreshJwtStrategy } from "src/auth/strategies/refresh-jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>("SECRET_KEY"),
  }),
  inject: [ConfigService],
});

@Module({
  imports: [UsersModule, PassportModule, jwtModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

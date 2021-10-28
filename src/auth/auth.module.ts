import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "src/common/strategies/local.strategy";
import { JwtStrategy } from "src/common/strategies/jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

const passportModule = PassportModule.register({
	defaultStrategy: "jwt",
});

const jwtModule = JwtModule.registerAsync({
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		secret: configService.get<string>("SECRET_KEY"),
	}),
	inject: [ConfigService],
});

@Module({
	imports: [UsersModule, passportModule, jwtModule],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}

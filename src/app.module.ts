import {
	ClassSerializerInterceptor,
	Module,
	Provider,
	ValidationPipe,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import joi from "joi";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

const validationPipe: Provider = {
	provide: "APP_PIPE",
	useFactory: () =>
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
};

const classSerializerInterceptor: Provider = {
	provide: "APP_INTERCEPTOR",
	useClass: ClassSerializerInterceptor,
};

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: joi.object({
				NODE_ENV: joi
					.string()
					.valid("development", "production", "test")
					.default("development"),
				DOMAIN: joi.string().default("localhost"),
				PORT: joi.number().default(4000),
				DATABASE_URL: joi.string().required(),
				SECRET_KEY: joi.string().required(),
			}),
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				url: configService.get<string>("DATABASE_URL"),
				logging: configService.get<string>("NODE_ENV") !== "production",
				entities: [User],
				synchronize: configService.get<string>("NODE_ENV") !== "production",
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
	],
	providers: [validationPipe, classSerializerInterceptor],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import joi from "joi";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: joi.object({
				NODE_ENV: joi
					.string()
					.valid("development", "production", "test")
					.default("development"),
				PORT: joi.number().default(4000),
				DATABASE_URL: joi.string().required(),
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
	],
})
export class AppModule {}

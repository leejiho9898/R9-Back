import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import joi from "joi";

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
			}),
		}),
	],
	providers: [
		{
			provide: "APP_PIPE",
			useFactory: () => {
				return new ValidationPipe({
					transform: true,
					whitelist: true,
					forbidNonWhitelisted: true,
				});
			},
		},
	],
})
export class AppModule {}

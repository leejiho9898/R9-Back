import {
  ClassSerializerInterceptor,
  Module,
  Provider,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import joi from "joi";
import { UsersModule } from "~/users/users.module";
import { AuthModule } from "~/auth/auth.module";
import { JobsModule } from "~/jobs/jobs.module";
import { HashtagsModule } from "~/hashtags/hashtags.module";
import { ReviewsModule } from "~/reviews/reviews.module";
import { BoardsModule } from "~/boards/boards.module";
import { User } from "~/users/entities/user.entity";
import { Address } from "~/users/entities/address.entity";
import { Hashtag } from "~/hashtags/entities/hashtag.entity";
import { Job } from "~/jobs/entities/job.entity";
import { Review } from "~/reviews/entities/review.entity";
import { Apply } from "./applys/entities/apply.entity";
import { Board } from "~/boards/entities/board.entity";
import { UploadsModule } from "~/uploads/uploads.module";
import { ApplysModule } from "~/applys/applys.module";

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

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test")
      .default("development"),
    DOMAIN: joi.string().default("localhost:4000"),
    ORIGIN: joi.string().default("http://localhost:3000"),
    PORT: joi.number().default(4000),
    DATABASE_URL: joi.string().required(),
    SECRET_KEY: joi.string().required(),
    SWAGGER_PATH: joi.string().default("docs"),
    AWS_REGION: joi.string().required(),
    AWS_ACCESS_KEY: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_S3_BUCKET_NAME: joi.string().required(),
  }),
});

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: "postgres",
    url: configService.get<string>("DATABASE_URL"),
    logging: configService.get<string>("NODE_ENV") !== "production",
    entities: [User, Address, Job, Hashtag, Board, Review, Apply],
    synchronize: configService.get<string>("NODE_ENV") !== "production",
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    configModule,
    typeOrmModule,
    UsersModule,
    AuthModule,
    JobsModule,
    HashtagsModule,
    BoardsModule,
    ReviewsModule,
    UploadsModule,
    ApplysModule,
  ],
  providers: [validationPipe, classSerializerInterceptor],
  controllers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "~/users/users.module";
import { ReviewsController } from "./reviews.controller";
import { ReviewsRepository } from "./reviews.repository";
import { ReviewsService } from "./reviews.service";

const typeOrmModule = TypeOrmModule.forFeature([ReviewsRepository]);

@Module({
  imports: [typeOrmModule, UsersModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}

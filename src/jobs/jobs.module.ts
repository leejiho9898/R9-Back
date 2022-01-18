import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { Job } from "./entities/job.entity";
import { HashtagsModule } from "~/hashtags/hashtags.module";

@Module({
  imports: [TypeOrmModule.forFeature([Job]), AuthModule, HashtagsModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { Job } from "./job.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [TypeOrmModule.forFeature([Job]), AuthModule],
	controllers: [JobsController],
	providers: [JobsService],
	exports: [JobsService],
})
export class JobsModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { Job } from "./job.entity";
// const typeOrmModule = TypeOrmModule.forFeature([User]);

@Module({
	imports: [TypeOrmModule.forFeature([Job])],
	controllers: [JobsController],
	providers: [JobsService],
	// exports: [JobsService],
})
export class JobsModule {}

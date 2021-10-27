import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

import { User } from "src/users/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Job } from "./job.entity";
import { JobsService } from "./jobs.service";

@Controller("jobs")
@ApiTags("jobs")
export class JobsController {
	constructor(private jobsService: JobsService) {}

	@Post("createJob")
	@UseGuards(AuthGuard())
	createJob(
		@Body() createJobDto: CreateJobDto,
		@CurrentUser() writer: User,
	): Promise<Job> {
		return this.jobsService.createJob(createJobDto, writer);
	}

	@Get("readAllJobs")
	readAllJobs() {
		return this.jobsService.readAllJobs();
	}

	@Get("readMyJobs")
	@UseGuards(AuthGuard())
	readMyJobs(@CurrentUser() writer: User) {
		return this.jobsService.readMyJobs(writer);
	}
	@Get("readJobDetail/:id")
	readJobDetail(@Param("id") id: string): Promise<Job> {
		return this.jobsService.readJobDetail(id);
	}

	@Delete("deleteJob/:id")
	deleteJob(@Param("id") id: string,
	@CurrentUser() writer:User): Promise<void> {
		return this.jobsService.deleteJob(id,writer);
	}

	@Patch("updateJob/:id")
	updateJob(
		@Body() createJobDto: CreateJobDto,
		@Param("id") id: string,
	): Promise<Job> {
		return this.jobsService.updateJob(createJobDto, id);
	}
}

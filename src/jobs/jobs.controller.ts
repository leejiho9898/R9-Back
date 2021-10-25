import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Job } from "./job.entity";
import { JobsService } from "./jobs.service";

@Controller("jobs")
@ApiTags("jobs")
export class JobsController {
	constructor(private jobsService: JobsService) {}

	@Post("createJob")
	createJob(
		@Body() createJobDto: CreateJobDto,
		@GetUser() user: User,
	): Promise<Job> {
		return this.jobsService.createJob(createJobDto, user);
	}

	@Get("readAllJobs")
	getAllJobs() {
		return this.jobsService.readAllJobs();
	}

	@Get("readJobDetail/:id")
	readJobDetail(@Param("id") id: string): Promise<Job> {
		return this.jobsService.readJobDetail(id);
	}

	@Delete("deleteJob/:id")
	deleteJob(@Param("id") id: string): Promise<void> {
		return this.jobsService.deleteJob(id);
	}

	@Patch("updateJob/:id")
	updateJob(
		@Body() createJobDto: CreateJobDto,
		@Param("id") id: string,
	): Promise<Job> {
		return this.jobsService.updateJob(createJobDto, id);
	}
}

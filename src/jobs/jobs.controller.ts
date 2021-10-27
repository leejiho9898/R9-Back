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
import { Auth } from "src/common/decorators/auth.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JobsService } from "./jobs.service";

@Controller("jobs")
@ApiTags("jobs")
export class JobsController {
	constructor(private jobsService: JobsService) {}

	@Post()
	@Auth(["ANY"])
	createJob(@Body() createJobDto: CreateJobDto, @CurrentUser() writer: User) {
		return this.jobsService.createJob(createJobDto, writer);
	}

	@Get()
	readAllJobs() {
		return this.jobsService.readAllJobs();
	}

	@Get("me")
	@UseGuards(AuthGuard())
	readMyJobs(@CurrentUser() writer: User) {
		return this.jobsService.readMyJobs(writer);
	}

	@Get(":id")
	readJobDetail(@Param("id") id: string) {
		return this.jobsService.readJobDetail(id);
	}

	@Delete(":id")
	deleteJob(@Param("id") id: string, @CurrentUser() writer: User) {
		return this.jobsService.deleteJob(id, writer);
	}

	@Patch(":id")
	updateJob(@Body() updateJobDto: UpdateJobDto, @Param("id") id: string) {
		return this.jobsService.updateJob(updateJobDto, id);
	}
}

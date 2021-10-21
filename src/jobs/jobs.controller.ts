/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
	constructor(private jobsService: JobsService) {}
	@Get()
	getAllJobs() {
		return 1;
	}
}

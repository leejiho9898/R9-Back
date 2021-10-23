import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobDto } from "./dto/job.dto";
import { Job } from "./job.entity";

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Job)
		private jobsRepository: Repository<Job>,
	) {}

	async createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
		const job = this.jobsRepository.create(createJobDto);
		await this.jobsRepository.save(job);
		return job;
	}

	async readAllJobs(): Promise<Job[]> {
		return this.jobsRepository.find();
	}
}

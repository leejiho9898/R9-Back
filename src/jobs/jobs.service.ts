import { Body, Injectable, NotFoundException } from "@nestjs/common";
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

	// 공고 생성
	async createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
		const job = this.jobsRepository.create(createJobDto);
		await this.jobsRepository.save(job);
		return job;
	}

	// 모든 공고 불러오기
	async readAllJobs(): Promise<Job[]> {
		return this.jobsRepository.find();
	}

	// 특정 id값의 공고 불러오기
	async readJobDetail(id: string): Promise<Job> {
		const found = await this.jobsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(
				`해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`,
			);
		}
		return found;
	}

	// 공고 삭제
	async deleteJob(id: string): Promise<void> {
		const result = await this.jobsRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(
				`해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`,
			);
		}
	}

	//공고 업데이트
	async updateJob(
		@Body() createJobDto: CreateJobDto,
		id: string,
	): Promise<Job> {
		const { title, detail, deadline, adress, personnel, age } = createJobDto;
		const job = await this.readJobDetail(id);
		job.title = title;
		job.detail = detail;
		job.deadline = deadline;
		job.adress = adress;
		job.personnel = personnel;
		job.age = age;
		return this.jobsRepository.save(job);
	}
}

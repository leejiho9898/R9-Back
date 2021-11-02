import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Job } from "./entities/job.entity";

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Job)
		private jobsRepository: Repository<Job>,
	) {}

	// 공고 생성
	async createJob(
		@Body() createJobDto: CreateJobDto,
		writer: User,
	): Promise<Job> {
		const { title, detail, deadline, adress, personnel, age } = createJobDto;
		const job = this.jobsRepository.create({
			title,
			detail,
			adress,
			personnel,
			age,
			writer,
			deadline,
		});
		await this.jobsRepository.save(job);
		return job;
	}

	// 모든 공고 불러오기
	async findAllJobs(): Promise<Job[]> {
		return this.jobsRepository.find();
	}

	// 내가올린 공고 불러오기
	async findMyJobs(writer: User): Promise<Job[]> {
		const query = this.jobsRepository.createQueryBuilder("job");
		query.where("job.writerId=:writerId", { writerId: writer.id });
		const jobs = await query.getMany();
		return jobs;
	}

	// 특정 id값의 공고 불러오기
	async findJobById(id: string): Promise<Job> {
		const found = await this.jobsRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(
				`해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`,
			);
		}
		return found;
	}

	// 공고 삭제
	async deleteJob(id: string, writer: User): Promise<void> {
		const result = await this.jobsRepository.delete({ id, writer });
		if (result.affected === 0) {
			throw new NotFoundException(
				`해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`,
			);
		}
	}

	// 공고 업데이트
	async updateJob(
		@Body() updateJobDto: UpdateJobDto,
		id: string,
	): Promise<Job> {
		const { title, detail, deadline, adress, personnel, age } = updateJobDto;
		const job = await this.findJobById(id);
		job.title = title;
		job.detail = detail;
		job.deadline = deadline;
		job.adress = adress;
		job.personnel = personnel;
		job.age = age;
		return this.jobsRepository.save(job);
	}
}

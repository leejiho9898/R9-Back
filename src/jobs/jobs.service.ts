import { Injectable, NotFoundException } from "@nestjs/common";
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
    private jobsRepository: Repository<Job>
  ) {}

  // 공고 생성
  async createJob(createJobDto: CreateJobDto, writer: User) {
    const job = this.jobsRepository.create({ ...createJobDto, writer });
    return await this.jobsRepository.save(job);
  }

  // 모든 공고 불러오기
  async findJobs() {
    return this.jobsRepository.find();
  }

  //* * hashtag 사용하여 필터링 */
  async findJobsByHashtag(ids: number[]) {
    console.log(ids);
    const query = this.jobsRepository.createQueryBuilder("job");
    query.leftJoinAndSelect("job.hashtags", "hashtag");
    query.where("hashtag.id IN (:...hashtagId)", { hashtagId: ids });
    const jobs = query.getMany();
    return jobs;
  }

  // 내가올린 공고 불러오기
  async findMyJobs(writer: User) {
    const jobs = await this.jobsRepository.find({ writer });
    return jobs;
  }

  // 특정 id값의 공고 불러오기
  async findJobById(id: number) {
    const found = await this.jobsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
    return found;
  }

  // 공고 삭제
  async deleteJob(id: number, writer: User): Promise<void> {
    const result = await this.jobsRepository.delete({ id, writer });
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
  }

  // 공고 업데이트
  async updateJob(updateJobDto: UpdateJobDto, id: number) {
    const found = await this.jobsRepository.findOne({ id });
    console.log(updateJobDto);
    if (!found) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
    const updatedJob = this.jobsRepository.create({ id, ...updateJobDto });
    console.log(updatedJob);
    await this.jobsRepository.save(updatedJob);
  }
}

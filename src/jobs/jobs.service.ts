import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { In, Like, Repository } from "typeorm";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Job, JobStatus } from "./entities/job.entity";
import { Page } from "~/common/page/page";
import { HashtagsService } from "~/hashtags/hashtags.service";
import { SearchJobDto } from "./dto/search-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private readonly hashtagsService: HashtagsService
  ) {}

  // 공고 생성
  async createJob(createJobDto: CreateJobDto, writer: User) {
    const job = this.jobsRepository.create({ ...createJobDto, writer });
    return await this.jobsRepository.save(job);
  }

  // 모든 공고 불러오기
  async findJobs(page) {
    const total = await this.jobsRepository.count();
    const found = await this.jobsRepository.find({
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
  }

  //* * hashtag 사용하여 필터링 */
  async findJobsByHashtag(ids: number[]) {
    const query = this.jobsRepository.createQueryBuilder("job");
    query.leftJoinAndSelect("job.writer", "user");
    query.leftJoinAndSelect("job.hashtags", "hashtag");
    query.where("hashtag.id IN (:...hashtagId)", { hashtagId: ids });
    const jobs = query.getMany();
    return jobs;
  }

  async searchJobList(page: SearchJobDto) {
    const query = this.jobsRepository
      .createQueryBuilder("job")
      .leftJoinAndSelect("job.hashtags", "hashtag")
      .where("1=1");

    // 제목
    if (page.title) {
      query.andWhere("job.title LIKE :title", { title: `%${page.title}%` });
    }

    // 주소
    if (page.adress) {
      query.andWhere("job.adress LIKE :adress", { adress: `%${page.adress}%` });
    }

    // 급여 방식
    if (page.payment) {
      query.andWhere("job.payment = :payment", { payment: page.payment });
    }

    // 근무형태
    if (page.workType) {
      query.andWhere("job.workType = :workType", {
        workType: page.workType,
      });
    }

    // 근무 기간
    if (page.period) {
      query.andWhere("job.period = :period", { period: page.period });
    }

    // 인원
    if (page.personnel) {
      query.andWhere("job.personnel = :personnel", {
        personnel: page.personnel,
      });
    }

    // 나이
    if (page.age) {
      query.andWhere("job.age = :age", { age: page.age });
    }

    // 해시태그 검색
    if (page.hashtagIds) {
      const hashtagIds = page.hashtagIds.split(",");
      query.andWhere("hashtag.id IN (:...hashtagIds)", { hashtagIds });
    }
    // 이부분 나중에 for로 바꾸기

    query.take(page.getLimit());
    query.skip(page.getOffset());
    query.orderBy("job.createdAt", "DESC");
    const found = await query.getMany();
    const total = await query.getCount();
    return { found, total };
  }

  async findJobsList({ found, total }) {
    const jobIds = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < found.length; i++) {
      jobIds.push(found[i].id);
    }

    const item = await this.jobsRepository.find({ id: In(jobIds) });
    return new Page(total, 10, item);
  }

  //* * hashtag 사용하여 필터링(페이징 처리) */
  async findJobsByHashtags(hashtagIds: number[], page) {
    const query = await this.jobsRepository
      .createQueryBuilder("job")
      .leftJoinAndSelect("job.hashtags", "hashtag")
      .where("hashtag.id IN (:...hashtagIds)", { hashtagIds })
      .take(page.getLimit())
      .skip(page.getOffset())
      .orderBy("job.createdAt", "DESC")
      .getMany();

    const jobIds = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < query.length; i++) {
      jobIds.push(query[i].id);
    }
    const found = await this.jobsRepository.find({ id: In(jobIds) });
    const total = await this.jobsRepository.count({ id: In(jobIds) });
    return new Page(total, page.pageSize, found);
  }

  // 내가올린 공고 불러오기
  async findMyJobs(writer: User) {
    const jobs = await this.jobsRepository.find({ writer });
    return jobs;
  }

  // 조건에 맞는 공고 불러오기
  async findJobsByTitle(title: string) {
    const found = await this.jobsRepository.find({
      title: Like(`%${title}%`),
    });
    if (!found) {
      throw new NotFoundException(
        `User with bizName '${title}' does not exist`
      );
    }
    return found;
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
  async deleteJob(id: number, writer: User) {
    const result = await this.jobsRepository.findOne({ id, writer });
    if (!result) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
    await this.jobsRepository.softDelete({ id });
  }

  // 공고 업데이트
  async updateJob(updateJobDto: UpdateJobDto, id: number) {
    const found = await this.jobsRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
    const updatedJob = this.jobsRepository.create({ id, ...updateJobDto });
    await this.jobsRepository.save(updatedJob);
  }

  // 공고 상태 업데이트
  async switchJobState(id: number) {
    const found = await this.jobsRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 공고를 찾을 수 없습니다.`
      );
    }
    let status = JobStatus.INACTIVATE;
    if (found.status === JobStatus.INACTIVATE) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      status = JobStatus.ACTIVATE;
    }
    const updatedJob = this.jobsRepository.create({
      id,
      status,
    });

    return await this.jobsRepository.save(updatedJob);
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "~/users/entities/user.entity";
import { CreateApplyDto } from "./dto/create-apply.dto";
import { Apply } from "./entities/apply.entity";

@Injectable()
export class ApplysService {
  constructor(
    @InjectRepository(Apply)
    private applyRepository: Repository<Apply>
  ) {}

  /** 지원서 생성 */
  async createApply(createApplyDto: CreateApplyDto, user: User) {
    const apply = this.applyRepository.create({
      ...createApplyDto,
      user,
    });
    return await this.applyRepository.save(apply);
  }

  /** 지원서 불러오기 */
  async findMyApplys(user: User) {
    const apply = this.applyRepository.find({ user });
    if (!apply) {
      throw new NotFoundException(`유저가 작성한 지원서를 찾을 수 없습니다.`);
    }
    return apply;
  }

  /** 특정 지원서 불러오기 */
  async findApplyById(id: number) {
    const apply = this.applyRepository.findOne({ id });
    if (!apply) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 지원서를 찾을 수 없습니다.`
      );
    }
    return apply;
  }

  /** 지원서 삭제 */
  async deleteApply(id: number) {
    const apply = await this.applyRepository.findOne({ id });
    if (!apply) {
      throw new NotFoundException(
        `해당 id(${id}) 값을 가진 지원서를 찾을 수 없습니다.`
      );
    }
    await this.applyRepository.softDelete(apply);
    return "성공적으로 삭제되었습니다.";
  }

  /**특정 공고의 지원서 목록 불러오기*/
  async findApplysByJob(jobId: number) {
    const query = this.applyRepository.createQueryBuilder("apply");
    query.leftJoinAndSelect("apply.job", "job");
    query.where("job.id = :jobId", { jobId });
    const applys = query.getMany();
    if (!applys) {
      throw new NotFoundException(`해당 공고에서 지원서를 찾을 수 없습니다.`);
    }
    return applys;
  }
}

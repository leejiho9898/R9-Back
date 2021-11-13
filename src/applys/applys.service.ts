import { Injectable } from "@nestjs/common";
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
    return apply;
  }

  /** 지원서 삭제 */
  async deleteApply(id: number) {
    const found = await this.applyRepository.findOne({ id });
    await this.applyRepository.softDelete(found);
    return "성공적으로 삭제되었습니다.";
  }
}

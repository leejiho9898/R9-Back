import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "~/users/users.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewsRepository } from "./reviews.repository";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly usersService: UsersService
  ) {}

  async findAllReviews() {
    return await this.reviewsRepository.find({ take: 10 });
  }

  async findReviews(query) {
    return await this.reviewsRepository.find({ where: query, take: 10 });
  }

  async findMyReviews(writer: User) {
    return await this.reviewsRepository.find({ writer });
  }

  async findReviewsbyUserId(bizId: string) {
    const found = await this.usersService.findOneUserById(bizId);
    const param = {
      biz: found,
    };
    return await this.reviewsRepository.find(param);
  }

  async createReview(createReviewDto: CreateReviewDto, writer: User) {
    const { title, content, startDate, endDate, rating, bizId } =
      createReviewDto;
    const biz = await this.usersService.findOneUserById(bizId);
    if (!biz) {
      throw new NotFoundException(
        `Review with id ${bizId} and user does not exist`
      );
    }

    const createDto = {
      title,
      content,
      startDate,
      endDate,
      rating,
      biz,
    };
    await this.reviewsRepository.save(
      this.reviewsRepository.create({ writer, ...createDto })
    );
    return "성공적으로 생성되었습니다.";
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
    writer: User
  ) {
    const found = this.reviewsRepository.findOne({ id, writer });
    if (!found) {
      throw new NotFoundException(
        `Review with id ${id} and user does not exist`
      );
    }
    await this.reviewsRepository.save(
      this.reviewsRepository.create(updateReviewDto)
    );
    return "성공적으로 업데이트 되었습니다.";
  }

  async deleteReview(id: number, writer: User) {
    const found = await this.reviewsRepository.findOne({ id, writer });
    if (!found) {
      throw new NotFoundException(`Review with id '${id}' does not exist`);
    }
    await this.reviewsRepository.softDelete({ id });
    return "성공적으로 삭제되었습니다.";
  }
}

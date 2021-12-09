import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { Page } from "~/common/page/page";
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

  async findAllReviews(page) {
    const total = await this.reviewsRepository.count();
    const found = await this.reviewsRepository.find({
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
  }

  async findReviews(query) {
    return await this.reviewsRepository.find({ where: { query }, take: 10 });
  }

  async findMyReviews(writer: User, page) {
    const total = await this.reviewsRepository.count({ writer });
    const found = await this.reviewsRepository.find({
      where: { writer },
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
  }

  async findReviewsbyUserId(bizId: string, page) {
    const biz = await this.usersService.findOneUserById(bizId);
    const param = {
      biz,
    };
    const total = await this.reviewsRepository.count(param);
    const found = await this.reviewsRepository.find({
      where: param,
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, found);
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
    await this.reviewsRepository.softDelete(found);
    return "성공적으로 삭제되었습니다.";
  }
}

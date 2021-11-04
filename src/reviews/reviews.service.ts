import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewsRepository } from "./reviews.repository";

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepository: ReviewsRepository) {}

  async findAllReviews() {
    return await this.reviewsRepository.find();
  }

  async findReviews(query) {
    return await this.reviewsRepository.find(query);
  }

  async findMyReviews(writer: User) {
    return await this.reviewsRepository.find({ writer });
  }

  async createReview(createReviewDto: CreateReviewDto, writer: User) {
    await this.reviewsRepository.save(
      this.reviewsRepository.create({ writer, ...createReviewDto })
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
        `Board with id ${id} and user does not exist`
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
      throw new NotFoundException(`Board with id '${id}' does not exist`);
    }
    await this.reviewsRepository.softDelete({ id });
    return "성공적으로 삭제되었습니다.";
  }
}

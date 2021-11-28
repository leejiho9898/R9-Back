import { EntityRepository, Repository } from "typeorm";
import { Review } from "./entities/review.entity";

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {
  async totalCount() {
    const found = await this.createQueryBuilder("t1")
      .select("COUNT(t1.*) as totalCount")
      .getRawOne();
    return found;
  }
}

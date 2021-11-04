import { EntityRepository, Repository } from "typeorm";
import { Review } from "./entities/review.entity";

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {}

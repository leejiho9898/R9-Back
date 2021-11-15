import { PickType } from "@nestjs/swagger";
import { Review } from "../entities/review.entity";

export class UpdateReviewDto extends PickType(Review, [
  "title",
  "content",
  "startDate",
  "endDate",
  "rating",
] as const) {}

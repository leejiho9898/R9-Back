import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Review } from "../entities/review.entity";

export class CreateReviewDto extends PickType(Review, [
  "title",
  "content",
  "startDate",
  "endDate",
  "rating",
] as const) {
  @IsString()
  @ApiProperty({ type: String, description: "기업 유저 ID" })
  bizId: string;
}

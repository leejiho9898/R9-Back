import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PageRequest } from "~/common/page/pageRequest";

export class SearchReviewDto extends PageRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "ID" })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "기업 유저 ID" })
  bizId?: string;
}

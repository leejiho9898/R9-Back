import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PageRequest } from "~/common/page/pageRequest";
import { PayMentsMethod } from "../entities/job.entity";

export class SearchJobDto extends PageRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "ID" })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "제목" })
  title?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "제목" })
  adress?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "임금 지불 방식" })
  payment?: PayMentsMethod;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "근무 형태" })
  workType?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "근무 기간" })
  period?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "인원" })
  personnel?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "나이" })
  age?: String;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: "해싵테그 ID 리스트" })
  hashtagIds?: String;
}

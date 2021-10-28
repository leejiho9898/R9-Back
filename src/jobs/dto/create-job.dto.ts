import { PickType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Hashtag } from "src/hashtag/entities/hashtag.entity";
import { Job } from "../entities/job.entity";

export class CreateJobDto extends PickType(Job, [
	"title",
	"detail",
	"adress",
	"personnel",
	"age",
	"deadline",
	"wage",
	"status",
	"hashtags",
] as const) {
	@IsOptional({ each: true })
	hashtags: Hashtag[];
}

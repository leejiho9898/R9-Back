import { PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
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
] as const) {
	@IsNumber()
	hashtags: number[];
}

import { PickType } from "@nestjs/swagger";
import { Job } from "../job.entity";

export class CreateJobDto extends PickType(Job, [
	"writer",
	"title",
	"detail",
	"deadline",
	"adress",
	"personnel",
	"age",
] as const) {}

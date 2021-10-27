import { PickType } from "@nestjs/swagger";
import { Job } from "../job.entity";

export class CreateJobDto extends PickType(Job, [
	"title",
	"detail",
	"adress",
	"personnel",
	"age",
	"deadline",

] as const) {}

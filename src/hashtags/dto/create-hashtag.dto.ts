import { PickType } from "@nestjs/swagger";
import { Hashtag } from "../entities/hashtag.entity";

export class CreateHashtagDto extends PickType(Hashtag, [
	"category",
	"name",
] as const) {}

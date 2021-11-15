import { PickType } from "@nestjs/swagger";
import { Hashtag } from "../entities/hashtag.entity";

export class CreateHashtagDto extends PickType(Hashtag, [
  "largeCategory",
  "smallCategory",
  "name",
] as const) {}

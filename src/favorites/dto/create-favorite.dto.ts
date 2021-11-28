import { PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Favorite } from "../entities/favorite.entity";

export class CreateFavoriteDto extends PickType(Favorite, [] as const) {
  @IsNumber()
  jobId: number;
}

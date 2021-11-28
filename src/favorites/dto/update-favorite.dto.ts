import { PickType } from "@nestjs/swagger";
import { Favorite } from "../entities/favorite.entity";

export class UpdateFavoriteDto extends PickType(Favorite, ["id"] as const) {}

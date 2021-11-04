import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class CreateBoardDto extends PickType(Board, [
  "title",
  "content",
  "category",
] as const) {}

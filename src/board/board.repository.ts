import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";

export class BoardRepository extends Repository<Board> {}

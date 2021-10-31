import { EntityRepository, Repository } from "typeorm";
import { Board } from "./entities/board.entity";

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {}

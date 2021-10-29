import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { BoardRepository } from "./board.repository";

const typeOrmModule = TypeOrmModule.forFeature([BoardRepository]);

@Module({
	imports: [typeOrmModule],
	providers: [BoardService],
	controllers: [BoardController],
})
export class BoardModule {}

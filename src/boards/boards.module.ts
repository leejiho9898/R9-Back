import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsService } from "./boards.service";
import { BoardsController } from "./boards.controller";
import { BoardsRepository } from "./boards.repository";

const typeOrmModule = TypeOrmModule.forFeature([BoardsRepository]);

@Module({
	imports: [typeOrmModule],
	providers: [BoardsService],
	controllers: [BoardsController],
})
export class BoardsModule {}

import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { BoardsRepository } from "./boards.repository";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardsService {
	constructor(private boardsRepository: BoardsRepository) {}

	async findBoards(query) {
		return await this.boardsRepository.find({
			order: query,
			take: 10,
		});
	}

	async createBoard(boardDto: CreateBoardDto, writer: User) {
		await this.boardsRepository.save(
			this.boardsRepository.create({ writer, ...boardDto }),
		);
		return "성공적으로 생성되었습니다.";
	}

	async updateBoard(id: number, updateBoardDto: UpdateBoardDto, writer: User) {
		const found = this.boardsRepository.findOne({ id, writer });
		if (!found) {
			throw new NotFoundException(
				`Board with id ${id} and user does not exist`,
			);
		}
		await this.boardsRepository.save(
			this.boardsRepository.create(updateBoardDto),
		);
		return "성공적으로 업데이트 되었습니다.";
	}

	async deleteBoard(id: number, writer: User) {
		const found = await this.boardsRepository.findOne({ id, writer });
		if (!found) {
			throw new NotFoundException(`Board with id '${id}' does not exist`);
		}
		await this.boardsRepository.softDelete({ id });
		return "성공적으로 삭제되었습니다.";
	}
}

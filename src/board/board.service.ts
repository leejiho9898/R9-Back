import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardService {
	constructor(private boardRepository: BoardRepository) {}

	async find(query) {
		return await this.boardRepository.find(query);
	}

	async create(boardDto: CreateBoardDto) {
		await this.boardRepository.save(this.boardRepository.create(boardDto));

		return "성공적으로 생성되었습니다.";
	}

	async update(id: number, updateBoardDto: UpdateBoardDto) {
		// 토큰 정보에서 user 정보 가져오기
		// const { writer } = updateBoardDto;
		const found = this.boardRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.boardRepository.save(
			this.boardRepository.create(updateBoardDto),
		);
		return "성공적으로 업데이트 되었습니다.";
	}

	async delete(id: number) {
		const found = await this.boardRepository.findOne({ id });
		if (!found) {
			throw new NotFoundException(`Hashtag with id '${id}' does not exist`);
		}
		await this.boardRepository.softDelete({ id });
		return "성공적으로 삭제되었습니다.";
	}

	// 빠진 기능 : 나의 게시물 리스트
}

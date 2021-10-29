import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
	constructor(private boardService: BoardService) {}

	@Get()
	@ApiOperation({
		summary: "게시판 검색 API",
		description: "Id 검색, 모든 게시물 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 게시물을 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	find(@Query("id") id: number) {
		const query = { id };

		return this.boardService.find(query);
	}

	@Post()
	@ApiOperation({
		summary: "게시판 생성 API",
		description: "게시물 생성한다.",
	})
	@ApiOkResponse({ description: "성공적으로 게시물을 생성완료" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	create(@Body() createBoardDto: CreateBoardDto) {
		return this.boardService.create(createBoardDto);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "게시물 수정 API",
		description: "게시물을 수정한다.",
	})
	@ApiOkResponse({ description: "성공적으로 게시물을 수정" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	updateHashtag(
		@Param("id") id: number,
		@Body() updateBoardDto: UpdateBoardDto,
	) {
		return this.boardService.update(id, updateBoardDto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "게시물 삭제 API",
		description: "게시물을 삭제한다.",
	})
	@ApiOkResponse({ description: "성공적으로 게시물 삭제" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	deleteHashtag(@Param("id") id: number) {
		return this.boardService.delete(id);
	}
}

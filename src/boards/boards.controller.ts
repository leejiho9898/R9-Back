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
  ApiTags,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("boards")
@ApiTags("Boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  @ApiOperation({
    summary: "게시판 검색 API",
    description: "Id 검색, 모든 게시물 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 게시물을 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findBoards(@Query("id") id: number, @Query("user") writer: string) {
    const query = { id, writer };

    return this.boardsService.findBoards(query);
  }

  @Post()
  @ApiOperation({
    summary: "게시판 생성 API",
    description: "게시물 생성한다.",
  })
  @ApiOkResponse({ description: "성공적으로 게시물을 생성완료" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser() writer: User
  ) {
    return this.boardsService.createBoard(createBoardDto, writer);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "게시물 수정 API",
    description: "게시물을 수정한다.",
  })
  @ApiOkResponse({ description: "성공적으로 게시물을 수정" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  updateBoard(
    @Param("id") id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @CurrentUser() writer: User
  ) {
    return this.boardsService.updateBoard(id, updateBoardDto, writer);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "게시물 삭제 API",
    description: "게시물을 삭제한다.",
  })
  @ApiOkResponse({ description: "성공적으로 게시물 삭제" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  deleteBoard(@Param("id") id: number, @CurrentUser() writer: User) {
    return this.boardsService.deleteBoard(id, writer);
  }
}

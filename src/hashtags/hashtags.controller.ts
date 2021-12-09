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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Auth } from "~/auth/decorators/auth.decorator";
import { CurrentUser } from "~/common/decorators/current-user.decorator";
import { User } from "~/users/entities/user.entity";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";
import { HashtagsService } from "./hashtags.service";

@Controller("hashtags")
@ApiTags("Hashtags")
export class HashtagsController {
  constructor(private hashtagsService: HashtagsService) {}

  @Get()
  @ApiOperation({
    summary: "모든 해시태그 검색 API",
    description: "모든 해시태그를 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 해시태그를 가져옴" })
  findHashtags() {
    return this.hashtagsService.findHashtags();
  }

  @Get("search")
  @ApiOperation({
    summary: "해시태그 검색 API",
    description: "제목, 카테고리 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 해시태그를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  search(
    @Query("id") id: number,
    @Query("name") name: string,
    @Query("category") category: string
  ) {
    const query = { id, name, category };

    return this.hashtagsService.searchHashtags(query);
  }

  @Get("category")
  @ApiOperation({
    summary: "모든 해시태그 검색 API",
    description: "카테고리 목록 해시태그를 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 해시태그를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findLargeCategory() {
    return this.hashtagsService.findCategory();
  }

  @Post()
  @ApiOperation({
    summary: "해시태그 생성 API",
    description: "해시태그를 생성한다.",
  })
  @ApiCreatedResponse({ description: "성공적으로 해시테그 생성이 완료" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  createHashtag(
    @Body() createHashtagDto: CreateHashtagDto,
    @CurrentUser() writer: User
  ) {
    return this.hashtagsService.createHashtag(createHashtagDto, writer);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "해시태그 수정 API",
    description: "해시태그를 수정한다.",
  })
  @ApiOkResponse({ description: "성공적으로 해시태그를 수정" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  updateHashtag(
    @Param("id") id: number,
    @Body() updateHashtagDto: UpdateHashtagDto
  ) {
    return this.hashtagsService.updateHashtag(id, updateHashtagDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "해시태그 삭제 API",
    description: "해시태그를 삭제한다.",
  })
  @ApiOkResponse({ description: "성공적으로 해시태그 삭제" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  deleteHashtag(@Param("id") id: number) {
    return this.hashtagsService.deleteHashtag(id);
  }
}

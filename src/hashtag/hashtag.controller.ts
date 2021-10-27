import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";

import { HashtagService } from "./hashtag.service";

@Controller("hashtag")
@ApiTags("Hashtag")
export class HashtagController {
	constructor(private hashtagService: HashtagService) {}

	@Get()
	@ApiOperation({
		summary: "모든 해시태그 검색 API",
		description: "모든 해시태그를 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그를 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	getAll() {
		return this.hashtagService.findAll();
	}

	@Post()
	@ApiOperation({
		summary: "해시태그 생성 API",
		description: "해시태그를 생성한다.",
	})
	@ApiCreatedResponse({ description: "성공적으로 해시테그 생성이 완료" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
		return this.hashtagService.create(createHashtagDto);
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
		@Body() updateHashtagDto: UpdateHashtagDto,
	) {
		return this.hashtagService.update(id, updateHashtagDto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "해시태그 삭제 API",
		description: "해시태그를 삭제한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그 삭제" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	deleteHashtag(@Param("id") id: number) {
		return this.hashtagService.delete(id);
	}

	@Get(":id")
	@ApiOperation({
		summary: "해시태그 검색 API",
		description: "아이디로 해시태그를 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findById(@Param("id") id: number) {
		return this.hashtagService.findOneById(id);
	}

	@Get(":name")
	@ApiOperation({
		summary: "해시태그 검색 API",
		description: "이름으로 해시태그를 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findByName(@Param("name") name: string) {
		return this.hashtagService.findOneByName(name);
	}

	@Get(":category")
	@ApiOperation({
		summary: "해시태그 검색 API",
		description: "카테고리로 해시태그를 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findByCategory(@Param("category") category: string) {
		return this.hashtagService.findByCategory(category);
	}

	@Get("category")
	@ApiOperation({
		summary: "해시태그 검색 API",
		description: "카테고리 목록 해시태그를 검색한다.",
	})
	@ApiOkResponse({ description: "성공적으로 해시태그 목록을 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	getCategory() {
		return this.hashtagService.findCategory();
	}
}

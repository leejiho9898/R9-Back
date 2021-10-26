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
	ApiTags,
} from "@nestjs/swagger";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";

import { HashtagService } from "./hashtag.service";

@Controller("hashtag")
@ApiTags("Hashtag")
export class HashtagController {
	constructor(private hashtagService: HashtagService) {}

	@Get("/")
	@ApiOkResponse({ description: "성공적으로 헤시태그를 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	getAll() {
		return this.hashtagService.findAll();
	}

	@Post("/")
	@ApiCreatedResponse({ description: "성공적으로 해시테그 생성이 완료" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
		return this.hashtagService.create(createHashtagDto);
	}

	@Patch("/:id")
	@ApiOkResponse({ description: "성공적으로 헤시태그를 수정" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	updateHashtag(
		@Param("id") id: number,
		@Body() updateHashtagDto: UpdateHashtagDto,
	) {
		return this.hashtagService.update(id, updateHashtagDto);
	}

	@Delete("/:id")
	@ApiOkResponse({ description: "성공적으로 헤시태그 삭제" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	deleteHashtag(@Param("id") id: number) {
		return this.hashtagService.delete(id);
	}

	@Get("/:id")
	@ApiOkResponse({ description: "성공적으로 헤시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findById(@Param("id") id: number) {
		return this.hashtagService.findOneById(id);
	}

	@Post("/name")
	@ApiOkResponse({ description: "성공적으로 헤시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findByName(@Body("name") name: string) {
		return this.hashtagService.findOneByName(name);
	}

	@Post("/category")
	@ApiOkResponse({ description: "성공적으로 헤시태그 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findByCategory(@Body("category") category: string) {
		return this.hashtagService.findByCategory(category);
	}

	@Get("/category")
	@ApiOkResponse({ description: "성공적으로 헤시태그 목록을 가져옴" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	getCategory() {
		return this.hashtagService.findCategory();
	}
}

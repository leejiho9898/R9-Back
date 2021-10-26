import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { UpdateHashtagDto } from "./dto/update-hashtag.dto";

import { HashtagService } from "./hashtag.service";

@Controller("hashtag")
@ApiTags("Hashtag")
export class HashtagController {
	constructor(private hashtagService: HashtagService) {}

	@Get("/")
	getAll() {
		return this.hashtagService.findAll();
	}

	@Post("/")
	createHashtag(@Body() createHashtagDto: CreateHashtagDto) {
		return this.hashtagService.create(createHashtagDto);
	}

	@Patch("/:id")
	updateHashtag(
		@Param("id") id: number,
		@Body() updateHashtagDto: UpdateHashtagDto,
	) {
		return this.hashtagService.update(id, updateHashtagDto);
	}

	@Delete("/:id")
	deleteHashtag(@Param("id") id: number) {
		return this.hashtagService.delete(id);
	}

	@Get("/:id")
	findById(@Param("id") id: number) {
		return this.hashtagService.findOneById(id);
	}

	@Post("/name")
	findByName(@Body("name") name: string) {
		return this.hashtagService.findOneByName(name);
	}

	@Post("/category")
	findByCategory(@Body("category") category: string) {
		return this.hashtagService.findByCategory(category);
	}

	@Get("/category")
	getCategory() {
		return this.hashtagService.findCategory();
	}
}

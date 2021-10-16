import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { Auth } from "src/common/decorators/auth.decorator";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Uesrs")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiCreatedResponse({ description: "성공적으로 사용자 생성이 완료됨" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Auth(["ADMIN"])
	@Get()
	@ApiOkResponse({ description: "성공적으로 검색이 완료됨" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findAll() {
		return this.usersService.findAll();
	}

	@Auth(["ADMIN"])
	@Get(":id")
	@ApiOkResponse({ description: "성공적으로 검색이 완료됨" })
	@ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	findOne(@Param("id") id: string) {
		return this.usersService.findOneById(id);
	}

	@Auth(["ADMIN"])
	@Patch(":id")
	@ApiOkResponse({ description: "성공적으로 사용자가 수정됨" })
	@ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Auth(["ADMIN"])
	@Delete(":id")
	@ApiOkResponse({ description: "성공적으로 사용자가 삭제됨" })
	@ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	remove(@Param("id") id: string) {
		return this.usersService.delete(id);
	}
}

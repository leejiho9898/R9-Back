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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@ApiTags("Uesrs")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "유저 생성", description: "유저를 생성한다." })
  @ApiCreatedResponse({ description: "성공적으로 사용자 생성이 완료됨" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Auth(["ADMIN"])
  @ApiOperation({ summary: "유저 검색", description: "유저를 검색한다." })
  @ApiOkResponse({ description: "성공적으로 검색이 완료됨" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findUsers() {
    return this.usersService.findUsers();
  }

  @Get(":id")
  @Auth(["ADMIN"])
  @ApiOperation({
    summary: "유저 검색",
    description: "한명의 유저를 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 검색이 완료됨" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
  findOneUserById(@Param("id") id: string) {
    return this.usersService.findOneUserById(id);
  }

  @Patch(":id")
  @Auth(["ADMIN"])
  @ApiOperation({ summary: "유저 수정", description: "유저정보를 수정한다." })
  @ApiOkResponse({ description: "성공적으로 사용자가 수정됨" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @Auth(["ADMIN"])
  @ApiOperation({ summary: "유저 삭제", description: "유저를 삭제한다." })
  @ApiOkResponse({ description: "성공적으로 사용자가 삭제됨" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiNotFoundResponse({ description: "존재하지 않는 사용자" })
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}

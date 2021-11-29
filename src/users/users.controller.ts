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
import { Auth } from "~/auth/decorators/auth.decorator";
import { CurrentUser } from "~/common/decorators/current-user.decorator";
import { UsersService } from "~/users/users.service";
import { CreateUserDto } from "~/users/dto/create-user.dto";
import { UpdateUserDto } from "~/users/dto/update-user.dto";
import { User } from "~/users/entities/user.entity";

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

  // @Post("fake")
  // createFakeUser() {
  //   return this.usersService.createFakeUser();
  // }

  @Get("businesses")
  @ApiOperation({
    summary: "비즈니스 정보",
    description: "비즈니스 유저의 정보를 반환한다.",
  })
  @ApiOkResponse({ description: "성공적으로 처리가 완료됨" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findBusinesses() {
    return this.usersService.findBusinesses();
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

  @Get("me")
  @Auth(["ANY"])
  @ApiOperation({
    summary: "현재 유저 정보",
    description: "로그인되어있는 유저의 정보를 반환",
  })
  @ApiOkResponse({ description: "성공적으로 처리가 완료됨" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findMeUser(@CurrentUser() user: User) {
    return user;
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

  @Patch("me")
  @Auth(["ANY"])
  @ApiOperation({
    summary: "현재 유저 정보 수정",
    description: "로그인되어있는 유저의 정보를 수정",
  })
  @ApiOkResponse({ description: "성공적으로 처리가 완료됨" })
  @ApiForbiddenResponse({ description: "인증에 실패하였거나 권한이 부족함" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  updateUserMe(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUserMe(user, updateUserDto);
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

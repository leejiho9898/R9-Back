import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger/dist/decorators";
import { Auth } from "~/auth/decorators/auth.decorator";
import { CurrentUser } from "~/common/decorators/current-user.decorator";
import { User } from "~/users/entities/user.entity";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { SearchFavoriteDto } from "./dto/search-favorite.dto";
import { FavoritesService } from "./favorites.service";

@Controller("favorites")
@ApiTags("Favorites")
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: "관심 검색 API",
    description: "모든 관심 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 관심을 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findFavorites(@Query() page: SearchFavoriteDto) {
    return this.favoritesService.findAllFavorites(page);
  }

  @Get("me")
  @ApiOperation({
    summary: "관심 검색 API",
    description: "나의 관심 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 관심을 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  findMyFavorites(
    @CurrentUser() writer: User,
    @Query() page: SearchFavoriteDto
  ) {
    return this.favoritesService.findMyFavorites(writer, page);
  }

  @Post()
  @ApiOperation({
    summary: "관심 검색 API",
    description: "모든 관심 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 관심을 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @CurrentUser() writer: User
  ) {
    return this.favoritesService.createFavorite(createFavoriteDto, writer);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "관심 삭제 API",
    description: "관심을 삭제한다.",
  })
  @ApiOkResponse({ description: "성공적으로 관심 삭제" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  deleteHashtag(@Param("id") id: number) {
    return this.favoritesService.deleteFavorite(id);
  }
}

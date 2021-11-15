import { Controller, Get } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger/dist/decorators";
import { FavoritesService } from "./favorites.service";

@Controller("favorite")
@ApiTags("Favorite")
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: "리뷰 검색 API",
    description: "모든 리뷰 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findReview() {
    return this.favoritesService.findAllFavorites();
  }
}

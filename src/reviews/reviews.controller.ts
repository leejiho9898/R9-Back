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
import { CreateReviewDto } from "./dto/create-review.dto";
import { SearchReviewDto } from "./dto/search-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewsService } from "./reviews.service";

@Controller("reviews")
@ApiTags("Reviews")
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({
    summary: "리뷰 검색 API",
    description: "모든 리뷰 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findReview(@Query() page: SearchReviewDto) {
    return this.reviewsService.findAllReviews(page);
  }

  @Post()
  @ApiOperation({
    summary: "리뷰 생성 API",
    description: "리뷰 생성한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰을 생성완료" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() writer: User
  ) {
    return this.reviewsService.createReview(createReviewDto, writer);
  }

  @Get("me")
  @ApiOperation({
    summary: "리뷰 검색 API",
    description: "Id 검색, 모든 리뷰 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  findMyReviews(@CurrentUser() writer: User, @Query() page: SearchReviewDto) {
    return this.reviewsService.findMyReviews(writer, page);
  }

  @Get("search")
  @ApiOperation({
    summary: "리뷰 검색 API",
    description: "Id ,기업별 검색 검색한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰를 가져옴" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  findReviewByBizId(@Query() page: SearchReviewDto) {
    return this.reviewsService.findReviews(page);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "리뷰 수정 API",
    description: "리뷰를 수정한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰를 수정" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  updateReview(
    @Param("id") id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() writer: User
  ) {
    return this.reviewsService.updateReview(id, updateReviewDto, writer);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "리뷰 삭제 API",
    description: "리뷰를 삭제한다.",
  })
  @ApiOkResponse({ description: "성공적으로 리뷰 삭제" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  @Auth(["ANY"])
  deleteReview(@Param("id") id: number, @CurrentUser() writer: User) {
    return this.reviewsService.deleteReview(id, writer);
  }
}

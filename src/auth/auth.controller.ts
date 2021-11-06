import { Controller, Post, Response, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Response as ExpressResponse } from "express";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOEKN_NAME,
} from "src/common/constants/auth";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { RefreshJwtAuthGuard } from "src/auth/guards/refresh-jwt-auth.guard";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/")
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: "유저 인증 및 토큰발급",
    description: "인증 후 토큰을 발급한다.",
  })
  @ApiBody({ type: AuthDto })
  @ApiCreatedResponse({ description: "성공적으로 토큰이 발급됨" })
  @ApiForbiddenResponse({ description: "인증에 실패하였음" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  async auth(
    @CurrentUser() user: User,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    response.setHeader("Set-Cookie", [
      await this.authService.generateAccessToken(user, { withCookie: true }),
      await this.authService.generateRefreshToken(user, { withCookie: true }),
    ]);

    return user;
  }

  @Post("/refresh")
  @UseGuards(RefreshJwtAuthGuard)
  @ApiOperation({
    summary: "유저 토큰 갱신",
    description: "토큰 검증 후 토큰을 갱신한다.",
  })
  @ApiCreatedResponse({ description: "성공적으로 토큰이 갱신됨" })
  @ApiForbiddenResponse({ description: "토큰 검증에 실패하였음" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  async refresh(
    @CurrentUser() user: User,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    response.setHeader("Set-Cookie", [
      await this.authService.generateAccessToken(user, { withCookie: true }),
      await this.authService.generateRefreshToken(user, { withCookie: true }),
    ]);

    return user;
  }

  @Post("/signout")
  @UseGuards(RefreshJwtAuthGuard)
  @ApiOperation({
    summary: "로그아웃",
    description: "사용자 로그아웃",
  })
  @ApiCreatedResponse({ description: "성공적으로 로그아웃됨" })
  @ApiForbiddenResponse({ description: "로그아웃에 실패하였음" })
  @ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
  async signOut(
    @CurrentUser() user: User,
    @Response({ passthrough: true }) response: ExpressResponse
  ) {
    await this.authService.signOut(user);

    response.setHeader("Set-Cookie", [
      this.authService.clearCookie(ACCESS_TOKEN_NAME),
      this.authService.clearCookie(REFRESH_TOEKN_NAME),
    ]);
  }
}

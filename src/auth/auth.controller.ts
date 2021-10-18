import { Response } from "express";
import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { COOKIE_ACCESS_TOKEN } from "src/common/constants/cookies";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {}

	@Get()
	@UseGuards(LocalAuthGuard)
	@ApiBody({ type: AuthDto })
	@ApiOkResponse({ description: "성공적으로 토큰이 발급됨" })
	@ApiForbiddenResponse({ description: "인증에 실패하였음" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	async generateUserTokens(
		@CurrentUser() user: User,
		@Res({ passthrough: true }) response: Response,
	) {
		const accessToken = await this.authService.generateTokens(user);

		response.cookie(COOKIE_ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			secure: this.configService.get<string>("NODE_ENV") === "production",
		});
	}
}

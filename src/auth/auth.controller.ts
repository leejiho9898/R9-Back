import { Controller, Post, UseGuards } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	@UseGuards(LocalAuthGuard)
	@ApiOperation({
		summary: "유저 인증 및 토큰발급",
		description: "인증 후 토큰을 발급한다.",
	})
	@ApiBody({ type: AuthDto })
	@ApiCreatedResponse({ description: "성공적으로 토큰이 발급됨" })
	@ApiForbiddenResponse({ description: "인증에 실패하였음" })
	@ApiBadRequestResponse({ description: "전송된 데이터가 유효하지않음" })
	async generateUserTokens(@CurrentUser() user: User) {
		return await this.authService.generateTokens(user);
	}
}

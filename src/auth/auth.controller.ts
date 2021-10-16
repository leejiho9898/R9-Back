import { Response } from "express";
import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { COOKIE_ACCESS_TOKEN } from "src/common/constants/cookies";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService,
	) {}

	@Get()
	@UseGuards(LocalAuthGuard)
	async generateUserTokens(
		@CurrentUser() user: User,
		@Res({ passthrough: true }) res: Response,
	) {
		const accessToken = await this.authService.generateTokens(user);

		res.cookie(COOKIE_ACCESS_TOKEN, accessToken, {
			httpOnly: true,
			secure: this.configService.get<string>("NODE_ENV") === "production",
		});
	}
}

import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { STRATEGY_LOCAL } from "../constants/strategies";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
	constructor(private authService: AuthService) {
		super({
			usernameField: "email",
			passwordField: "password",
		});
	}

	async validate(email: string, password: string) {
		return await this.authService.verifyUser(email, password);
	}
}

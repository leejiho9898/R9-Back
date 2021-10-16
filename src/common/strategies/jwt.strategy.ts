import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { STRATEGY_JWT } from "../constants/strategies";
import { COOKIE_ACCESS_TOKEN } from "../constants/cookies";

export interface JwtPayload {
	aud?: string;
	exp?: number;
	iss?: string;
	jti?: string;
	sub?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_JWT) {
	constructor(
		protected readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req.cookies[COOKIE_ACCESS_TOKEN],
			]),
			secretOrKey: configService.get<string>("SECRET_KEY"),
		});
	}

	async validate(payload: JwtPayload) {
		return await this.usersService.findOneById(payload.aud);
	}
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async verifyUser(email: string, password: string) {
		const user = await this.usersService.findOneUserByEmail(email);
		if (!(await user.verifyPassword(password))) {
			throw new UnauthorizedException("Invalid password");
		}
		return user;
	}

	async generateTokens(user: User) {
		// TODO: refresh token 기능 (httpOnly cookie)

		const accessToken = await this.jwtService.signAsync(
			{
				/* add etc info */
			},
			{
				audience: user.id,
				expiresIn: "1h",
				issuer: this.configService.get<string>("DOMAIN"),
				subject: "access-token",
			},
		);

		return accessToken;
	}
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request as ExpressRequest } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { REFRESH_TOEKN_NAME } from "../../common/constants/auth";
import { JwtPayload } from "../../common/types/jwt-payload.interface";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  "refresh-jwt"
) {
  constructor(
    protected readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: ExpressRequest) => request.cookies[REFRESH_TOEKN_NAME],
      ]),
      secretOrKey: configService.get<string>("SECRET_KEY"),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneUserById(payload.aud);
    if (user.token !== payload.jti) {
      throw new UnauthorizedException("The refresh token is invalid.");
    }

    return user;
  }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request as ExpressRequest } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ACCESS_TOKEN_NAME } from "src/common/constants/auth";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../../common/types/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    protected readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: ExpressRequest) => req.cookies[ACCESS_TOKEN_NAME],
      ]),
      secretOrKey: configService.get<string>("SECRET_KEY"),
    });
  }

  async validate(payload: JwtPayload) {
    return await this.usersService.findOneUserById(payload.aud);
  }
}

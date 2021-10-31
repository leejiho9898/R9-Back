import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";
import * as cookie from "cookie";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_NAME,
  REFRESH_TOEKN_EXP,
  REFRESH_TOEKN_NAME,
} from "src/common/constants/auth";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async verifyUser({ email, password }: AuthDto) {
    const user = await this.usersService.findOneUserByEmail(email);
    if (!(await user.verifyPassword(password))) {
      throw new UnauthorizedException("Invalid password");
    }
    return user;
  }

  async generateAccessToken(
    user: User,
    options: { withCookie: boolean } = { withCookie: false }
  ) {
    const token = await this.jwtService.signAsync(
      {},
      {
        audience: user.id,
        expiresIn: `${ACCESS_TOKEN_EXP}s`,
        issuer: this.configService.get<string>("DOMAIN"),
        subject: ACCESS_TOKEN_NAME,
      }
    );

    if (options.withCookie) {
      return this.withCookie(ACCESS_TOKEN_NAME, token, {
        maxAge: ACCESS_TOKEN_EXP,
      });
    }
    return token;
  }

  async generateRefreshToken(
    user: User,
    options: { withCookie: boolean } = { withCookie: false }
  ) {
    const jwtid = uuidv4();
    const token = await this.jwtService.signAsync(
      {},
      {
        audience: user.id,
        expiresIn: `${REFRESH_TOEKN_EXP}s`,
        issuer: this.configService.get<string>("DOMAIN"),
        jwtid,
        subject: REFRESH_TOEKN_NAME,
      }
    );
    await this.usersService.updateUser(user.id, { token: jwtid });

    if (options.withCookie) {
      return this.withCookie(REFRESH_TOEKN_NAME, token, {
        maxAge: REFRESH_TOEKN_EXP,
      });
    }
    return token;
  }

  withCookie(
    name: string,
    value: string,
    options?: cookie.CookieSerializeOptions
  ) {
    return cookie.serialize(name, value, {
      domain:
        this.configService.get<string>("NODE_ENV") === "production"
          ? this.configService.get<string>("DOMAIN")
          : undefined,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      httpOnly: true,
      path: "/",
      ...options,
    });
  }
}

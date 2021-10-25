import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { STRATEGY_JWT } from "../constants/strategies";

@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_JWT) {}

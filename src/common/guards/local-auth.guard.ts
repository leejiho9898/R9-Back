import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { STRATEGY_LOCAL } from "../constants/strategies";

@Injectable()
export class LocalAuthGuard extends AuthGuard(STRATEGY_LOCAL) {}

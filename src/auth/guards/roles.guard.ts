import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/users/entities/user.entity";
import { METADATA_ROLES } from "../../common/constants/metadata";
import type { AllowedRoles } from "../decorators/auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles[]>(
      METADATA_ROLES,
      context.getHandler()
    );

    if (!roles || roles.includes("ANY")) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new UnauthorizedException("A valid token does not exist.");
    }

    return roles.includes(user.role);
  }
}

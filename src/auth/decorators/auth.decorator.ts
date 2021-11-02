import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiCookieAuth } from "@nestjs/swagger";
import { Role } from "src/users/entities/user.entity";
import { METADATA_ROLES } from "../../common/constants/metadata";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export type AllowedRoles = keyof typeof Role | "ANY";

export const Auth = (roles: AllowedRoles[]) =>
  applyDecorators(
    SetMetadata(METADATA_ROLES, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiCookieAuth("auth")
  );

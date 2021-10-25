import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "src/users/entities/user.entity";
import { METADATA_ROLES } from "../constants/metadata";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export type AllowedRoles = keyof typeof Role | "ANY";

export const Auth = (roles: AllowedRoles[]) =>
	applyDecorators(
		SetMetadata(METADATA_ROLES, roles),
		UseGuards(JwtAuthGuard, RolesGuard),
	);

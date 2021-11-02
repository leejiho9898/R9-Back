import { PartialType, PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class UpdateUserDto extends PartialType(
  PickType(User, ["name", "email", "password", "role", "token"] as const)
) {}

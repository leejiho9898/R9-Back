import { PickType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class CreateUserDto extends PickType(User, [
  "name",
  "email",
  "password",
  "gender",
  "profileImage",
  "address",
  "role",
] as const) {}

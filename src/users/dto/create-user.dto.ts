import { PickType } from "@nestjs/swagger";
import { User } from "~/users/entities/user.entity";

export class CreateUserDto extends PickType(User, [
  "name",
  "email",
  "password",
  "bizName",
  "bizNumber",
  "gender",
  "dateOfBirth",
  "profileImage",
  "address",
  "role",
  "token",
  "useHashtags",
] as const) {}

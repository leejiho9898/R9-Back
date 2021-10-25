import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches } from "class-validator";
import { REGEXP_PASSWORD } from "src/common/constants/regexp";

export class AuthDto {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@Matches(REGEXP_PASSWORD)
	password: string;
}

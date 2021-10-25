// import { PickType } from "@nestjs/swagger";
// import { Job } from "../job.entity";

// export class CreateJobDto extends PickType(Job, [
// 	"title",
// 	"detail",
// 	"adress",
// 	"personnel",
// 	"age",
// 	`deadline`,
// ] as const) {}

import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateJobDto {
	// 작성자 ID
	@IsNotEmpty()
	writer: User;

	// 공고 제목
	@IsNotEmpty()
	title: string;

	// 근무 내용
	@IsNotEmpty()
	detail: string;

	// 마감일
	@IsNotEmpty()
	deadline: Date;

	@IsNotEmpty()
	adress: string;

	// 인원
	@IsNotEmpty()
	personnel: string;

	// 연령 조건
	@IsNotEmpty()
	age: number;

	// 주소
}

import { IsNotEmpty } from "class-validator";

export class CreateJobDto {
	// 작성자 ID
	@IsNotEmpty()
	writer: string;

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

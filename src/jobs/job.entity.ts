import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job extends Base {
	@PrimaryGeneratedColumn("uuid")
	@ApiProperty()
	@IsUUID()
	id: string;

	// 작성자 ID
	@Column()
	@ApiProperty()
	@IsString()
	writer: string;

	// 공고 제목
	@Column()
	@ApiProperty()
	@IsString()
	title: string;

	// 근무 내용
	@Column()
	@ApiProperty()
	@IsString()
	detail: string;

	// 마감일
	@Column()
	@ApiProperty()
	@IsDate()
	deadline: Date;

	// 인원
	@Column()
	@ApiProperty()
	@IsString()
	personnel: string;

	// 희망연령
	@Column()
	@ApiProperty()
	@IsNumber()
	age: number;

	// 주소
	@Column()
	@ApiProperty()
	@IsString()
	adress: string;
}

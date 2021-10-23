import { IsUUID } from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job extends Base {
	@PrimaryGeneratedColumn("uuid")
	@IsUUID()
	id: string;

	// 작성자 ID
	@Column()
	writer: string;

	// 공고 제목
	@Column()
	title: string;

	// 근무 내용
	@Column()
	detail: string;

	// 마감일
	@Column()
	deadline: Date;

	// 인원
	@Column()
	personnel: string;

	// 희망연령
	@Column()
	age: number;

	// 주소
	@Column()
	adress: string;
}

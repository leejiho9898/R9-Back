import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Job extends BaseEntity {
	@PrimaryGeneratedColumn()
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

	// 생성일자
	@CreateDateColumn()
	created_at: Date;

	// 수정일자
	@UpdateDateColumn()
	updated_at: Date;
}

import { ApiProperty } from "@nestjs/swagger";
import {
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { Base } from "src/common/entities/base.entitiy";
import { Hashtag } from "src/hashtag/entities/hashtag.entity";
import { User } from "src/users/entities/user.entity";
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { PayMentsMethod } from "../enum/job- payment.enum";
import { JobStatus } from "../enum/job-status.enum";

@Entity()
export class Job extends Base {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	@IsNumber()
	id: number;
	/** 작성자 ID */

	@ManyToOne(() => User, (writer) => writer.jobs, { eager: true })
	@ApiProperty()
	@IsString()
	writer: User;

	/** 해쉬태그 */
	@ManyToMany(() => Hashtag, (hashtag) => hashtag.job, {
		eager: true,
	})
	@ApiProperty()
	@JoinTable()
	hashtags: Hashtag[];

	/** 공고 제목 */
	@Column()
	@ApiProperty()
	@IsString()
	title: string;

	/** 마감일 */
	@Column()
	@ApiProperty()
	@IsDateString()
	deadline: Date;

	/** 근무 내용 */
	@Column()
	@ApiProperty()
	@IsString()
	detail: string;

	/** 인원 */
	@Column()
	@ApiProperty()
	@IsNumber()
	personnel: number;

	/** 희망연령 */
	@Column()
	@ApiProperty()
	@IsNumber()
	age: number;

	/** 주소 */
	@Column()
	@ApiProperty()
	@IsString()
	adress: string;

	/** 임금 지불 방식 */
	@Column({ enum: PayMentsMethod, default: PayMentsMethod.PERHOUR })
	@ApiProperty()
	@IsOptional()
	@IsEnum(PayMentsMethod)
	payment: PayMentsMethod;

	/** 임금 */
	@Column({ default: 8750 })
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	wage: number;

	/** 공고 상태 */
	@Column({ enum: JobStatus, default: JobStatus.ACTIVATE })
	@ApiProperty()
	@IsOptional()
	@IsEnum(JobStatus)
	status: JobStatus;
}

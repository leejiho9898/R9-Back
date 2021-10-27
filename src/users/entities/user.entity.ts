import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsEnum, IsString, IsUUID, Matches } from "class-validator";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import bcrypt from "bcrypt";
import { Base } from "src/common/entities/base.entitiy";
import { REGEXP_PASSWORD } from "src/common/constants/regexp";
import { Job } from "src/jobs/job.entity";

export enum Role {
	ADMIN = "ADMIN",
	USER = "USER",
	BUSINESS = "BUSINESS",
}
@Entity()
export class User extends Base {
	@PrimaryGeneratedColumn("uuid")
	@ApiProperty({ type: String, description: "사용자 UUID" })
	@IsUUID()
	id: string;

	@Column()
	@ApiProperty()
	@IsString()
	name: string;

	@Column({ unique: true })
	@ApiProperty()
	@IsEmail()
	email: string;

	@Column()
	@ApiProperty()
	@Matches(REGEXP_PASSWORD)
	@Exclude({ toPlainOnly: true })
	password: string;

	@Column({ type: "enum", enum: Role })
	@ApiProperty({ enum: Role })
	@IsEnum(Role)
	role: Role;

	@Column({ nullable: true })
	@ApiProperty()
	@IsString()
	address: string;

	@OneToMany((type) => Job, (job) => job.writer)
	jobs: Job[];

	@BeforeInsert()
	@BeforeUpdate()
	async preDataProcess() {
		if (this.email) {
			this.email = this.email.toLowerCase();
		}
		if (this.password) {
			this.password = await bcrypt.hash(this.password, 10);
		}
	}

	async verifyPassword(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}
